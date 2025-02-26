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
} from "@ant-design/icons";

export const siderItems = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: "/employees",
    label: "Manage Employees",
    icon: <TeamOutlined />,
    privilege: "Employee",
  },
  {
    key: "/guests",
    label: "Manage Guests",
    icon: <UserAddOutlined />,
    privilege: "Guest",
  },
  {
    key: "rooms",
    label: "Room and Reservations",
    icon: <HomeOutlined />,
    children: [
      {
        key: "/room-reservations",
        label: "Room Reservations",
        icon: <CalendarOutlined />,
        privilege: "Room Reservation",
      },
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
        key: "/amenities",
        label: "Amenities",
        icon: <GiftOutlined />,
        privilege: "Amenity",
      },
      {
        key: "/room-inventory",
        label: "Room Inventory",
        icon: <AppstoreOutlined />,
        privilege: "Room Inventory",
      },
      {
        key: "/room-pricing-rules",
        label: "Room Pricing Rules",
        icon: <DollarCircleOutlined />,
        privilege: "Room Pricing Rule",
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
