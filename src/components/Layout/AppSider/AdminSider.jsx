import { Col, Menu, Row } from "antd";
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
    <Row justify="center">
      <Col span={24}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>Welcome</h1>
          <h4>Admin</h4>
        </div>

        <Menu
          mode="inline"
          items={AdminSiderItems}
          onClick={(e) => navigate(e.key)}
          defaultSelectedKeys={selectedKey}
        />
      </Col>
    </Row>
  );
};
export default AdminSider;
