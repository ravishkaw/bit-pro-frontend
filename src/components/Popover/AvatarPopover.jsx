import { Popover, Menu, Avatar } from "antd";
import {
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

// Header Avatar button
const AvatarPopover = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const gotoProfile = () => {
    navigate("/user-profile");
  };

  const items = [
    {
      key: "1",
      icon: <ProfileOutlined />,
      label: "Profile",
      onClick: gotoProfile,
    },
    {
      key: "2",
      icon: <LogoutOutlined />,
      label: "Log Out",
      onClick: handleLogout,
    },
  ];

  return (
    <Popover
      content={
        <Menu selectedKeys={[]} style={{ borderRight: "none" }} items={items} />
      }
      trigger="hover"
      placement="bottom"
      styles={{ body: { padding: 0, marginRight: 20 } }}
    >
      <Avatar style={avatarStyle} icon={<UserOutlined />} />
    </Popover>
  );
};

export default AvatarPopover;

const avatarStyle = {
  margin: 0,
  cursor: "pointer",
};
