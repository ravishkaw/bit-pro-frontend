import { useAuth } from "../../../contexts/AuthContext";
import AdminSider from "./AdminSider";

// Show the relevant sider for the user based on their system role
const SiderContent = () => {
  const { user } = useAuth();

  if (user?.role === "role_admin") {
    return <AdminSider />;
  } else if (user?.role === "role_manager") {
    return <div>Manager Sider Content</div>;
  } else if (user?.role === "receptionist") {
    return <div>Receptionist Sider Content</div>;
  } else if (user?.role === "staff") {
    return <div>Staff Sider Content</div>;
  }
};

export default SiderContent;
