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
    key: "/admin/employees",
    label: "Manage Employees",
    icon: <IdcardOutlined />,
  },
  {
    key: "/admin/users",
    label: "Manage Users",
    icon: <UserOutlined />,
  },
  {
    key: "/admin/privileges",
    label: "Privileges",
    icon: <LockOutlined />,
  },
  {
    key: "/admin/rooms",
    label: "Manage Rooms",
    icon: <HomeOutlined />,
  },
  {
    key: "/admin/bookings",
    label: "Manage Bookings",
    icon: <ScheduleOutlined />,
  },
];
