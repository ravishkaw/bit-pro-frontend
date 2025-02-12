import { Menu } from "antd";
import { useNavigate } from "react-router";
import { AdminSiderItems } from "./SiderItems";
import { useEffect, useState } from "react";
import { useHeaderTitleContext } from "../../../contexts/HeaderTitleContext";

// Admin sider content
const AdminSider = () => {
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const { findLabel } = useHeaderTitleContext();
  const navigate = useNavigate();

  // sets the selected key of menu items based on url
  useEffect(() => {
    setSelectedKey(location.pathname);
    findLabel(location.pathname, AdminSiderItems);
  }, [location.pathname]);

  return (
    <Menu
      mode="inline"
      items={AdminSiderItems}
      onClick={(e) => navigate(e.key)}
      defaultSelectedKeys={selectedKey}
    />
  );
};

export default AdminSider;
