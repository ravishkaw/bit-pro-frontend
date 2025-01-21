import { Menu } from "antd";
import { useNavigate } from "react-router";
import { AdminSiderItems } from "../../../constants/SiderItems";
import { useEffect, useState } from "react";

const AdminSider = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
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
