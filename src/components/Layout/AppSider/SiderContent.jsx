import { useAuth } from "../../../contexts/AuthContext";
import AdminSider from "./AdminSider";

const SiderContent = () => {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <AdminSider />;
  } else if (user?.role === "manager") {
    return <div>Manager Sider Content</div>;
  } else if (user?.role === "receptionist") {
    return <div>Receptionist Sider Content</div>;
  } else if (user?.role === "staff") {
    return <div>Staff Sider Content</div>;
  }
};
export default SiderContent;
