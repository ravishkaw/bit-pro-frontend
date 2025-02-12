import {
  TeamOutlined,
  MailOutlined,
  SettingOutlined,
  DashboardOutlined,
  ScheduleOutlined,
  UserOutlined,
  IdcardOutlined,
  HomeOutlined,
  BoxPlotOutlined,
  DollarOutlined,
  LineChartOutlined,
  LockOutlined,
} from "@ant-design/icons";

// Sider items for the system roles
// Admin
export const AdminSiderItems = [
  {
    key: "/admin",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: "/admin/manage-employees",
    label: "Manage Employees",
    icon: <IdcardOutlined />,
  },
  {
    key: "/admin/manage-users",
    label: "Manage Users",
    icon: <UserOutlined />,
  },
  {
    key: "/admin/manage-rooms",
    label: "Manage Rooms",
    icon: <HomeOutlined />,
  },
  {
    key: "/admin/manage-bookings",
    label: "Manage Bookings",
    icon: <ScheduleOutlined />,
  },
  {
    key: "/admin/privileges",
    label: "Privileges",
    icon: <LockOutlined />,
  },

 
];
