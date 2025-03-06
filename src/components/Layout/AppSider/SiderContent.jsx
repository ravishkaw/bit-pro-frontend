import { useEffect, useState } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useHeaderTitleContext } from "../../../contexts/HeaderTitleContext";

import { siderItems } from "./SiderItems";

import { getLevelKeys } from "../../../utils/utils";

const SiderContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const [stateOpenKeys, setStateOpenKeys] = useState([]);
  const { findLabel } = useHeaderTitleContext();
  const { privilegedModules } = useAuth();

  // get the level of keys
  const levelKeys = getLevelKeys(siderItems);

  // filter menu items based on privileges
  const filterMenuItems = (menuItems) => {
    return menuItems
      .map((item) => {
        const clonedItem = { ...item };

        // Always include Dashboard
        if (item.key === "/dashboard") {
          return clonedItem;
        }

        // Items with children
        if (item.children && item.children.length > 0) {
          const filteredChildren = filterMenuItems(item.children);

          // Only return parent if it has privileged children
          if (filteredChildren.length > 0) {
            clonedItem.children = filteredChildren;
            return clonedItem;
          }
          return null;
        }

        // Return item if user has privilege, otherwise null
        return privilegedModules?.includes(item.privilege) ? clonedItem : null;
      })
      .filter(Boolean); // Remove items without privilege (remove null)
  };

  const filteredSiderItems = filterMenuItems(siderItems);

  useEffect(() => {
    setSelectedKey(location.pathname);
    findLabel(location.pathname, filteredSiderItems);
  }, [location.pathname, filteredSiderItems, findLabel]);

  // set the key when changing
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );

    // Open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // Remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // Remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // Close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      items={filteredSiderItems}
      onClick={(e) => navigate(e.key)}
      defaultSelectedKeys={[selectedKey]}
      selectedKeys={[selectedKey]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ border: "none" }}
    />
  );
};

export default SiderContent;
