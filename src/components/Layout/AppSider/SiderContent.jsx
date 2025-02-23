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

  // Recursive function to filter menu items based on privileges
  const filterMenuItems = (items) => {
    return items.reduce((authorizedMenuItems, item) => {
      // Always include Dashboard
      if (item.key === "/dashboard") {
        return [...authorizedMenuItems, item];
      }

      // Handle group type items
      if (item.children || item.type === "group") {
        const filteredChildren = filterMenuItems(item.children || []);
        if (filteredChildren.length > 0) {
          return [
            ...authorizedMenuItems,
            { ...item, children: filteredChildren },
          ];
        }
        return authorizedMenuItems;
      }

      // Check if user has privilege for this item
      if (privilegedModules?.includes(item.privilege)) {
        return [...authorizedMenuItems, item];
      }

      return authorizedMenuItems;
    }, []);
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
