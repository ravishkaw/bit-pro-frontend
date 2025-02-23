import { LogoutOutlined, ProfileOutlined } from "@ant-design/icons";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router";

// Dropdown items of the profile avatar
export const avatarDropdownItems = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const gotoProfile = () => {
    navigate("/user-profile");
  };

  return [
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
};
