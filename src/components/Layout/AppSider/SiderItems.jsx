import {
  TeamOutlined,
  SettingOutlined,
  DashboardOutlined,
  UserOutlined,
  HomeOutlined,
  UserAddOutlined,
  BankOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  SafetyOutlined,
  AppstoreOutlined,
  GiftOutlined,
  ScheduleOutlined,
  ShopOutlined,
} from "@ant-design/icons";

export const siderItems = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: "reservation",
    label: "Reservations",
    icon: <ScheduleOutlined />,
    children: [
      {
        key: "/guests",
        label: "Manage Guests",
        icon: <UserAddOutlined />,
        privilege: "Guest",
      },
      {
        key: "/room-reservations",
        label: "Room Reservations",
        icon: <CalendarOutlined />,
        privilege: "Room Reservation",
      },
    ],
  },
  {
    key: "rooms",
    label: "Rooms",
    icon: <HomeOutlined />,
    children: [
      {
        key: "/rooms",
        label: "Manage Rooms",
        icon: <BankOutlined />,
        privilege: "Room",
      },
      {
        key: "/room-types",
        label: "Room Types",
        icon: <HomeOutlined />,
        privilege: "Room Type",
      },
      {
        key: "/room-facilities",
        label: "Room Facilities",
        icon: <GiftOutlined />,
        privilege: "Room Facility",
      },
      {
        key: "/room-inventory",
        label: "Room Inventory",
        icon: <AppstoreOutlined />,
        privilege: "Room Inventory",
      },
    ],
  },
  {
    key: "/employees",
    label: "Manage Employees",
    icon: <TeamOutlined />,
    privilege: "Employee",
  },
  {
    key: "inventory",
    label: "Inventory",
    icon: <ShopOutlined />,
    children: [
      {
        key: "/inventory",
        label: "Manage Inventory",
        icon: <ShopOutlined />,
        privilege: "Inventory",
      },
    ],
  },
  {
    key: "system",
    label: "System Modules",
    icon: <SettingOutlined />,
    // type: "group",
    children: [
      {
        key: "/users",
        label: "Manage Users",
        icon: <UserOutlined />,
        privilege: "User",
      },
      {
        key: "/privileges",
        label: "Privileges",
        icon: <SafetyOutlined />,
        privilege: "Privilege",
      },
    ],
  },
];
