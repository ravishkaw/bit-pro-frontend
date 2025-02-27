import { useEffect, useState } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useHeaderTitleContext } from "../../../contexts/HeaderTitleContext";

import { siderItems } from "./SiderItems";

const SiderContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const { findLabel } = useHeaderTitleContext();
  const { privilegedModules } = useAuth();

  const filterMenuItems = (menuItems) => {
    return menuItems
      .map((item) => {
        // Clone the item to avoid changing original item array
        const clonedItem = { ...item };

        // Always include Dashboard
        if (item.key === "/dashboard") {
          return clonedItem;
        }

        // items with children
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

  return (
    <Menu
      mode="inline"
      items={filteredSiderItems}
      onClick={(e) => navigate(e.key)}
      defaultSelectedKeys={[selectedKey]}
      selectedKeys={[selectedKey]}
    />
  );
};

export default SiderContent;
