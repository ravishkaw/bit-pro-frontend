import { LogoutOutlined, ProfileOutlined } from "@ant-design/icons";
import { useAuth } from "../../../contexts/AuthContext";

// Dropdown items of the profile avatar
export const avatarDropdownItems = () => {
  const { logout } = useAuth();

  return [
    {
      key: "1",
      icon: <ProfileOutlined />,
      label: "Profile",
    },
    {
      key: "2",
      icon: <LogoutOutlined />,
      label: "Log Out",
      onClick: logout,
    },
  ];
};
