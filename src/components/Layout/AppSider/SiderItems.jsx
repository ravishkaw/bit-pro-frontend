import {
  DashboardOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  GiftOutlined,
  HomeOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  IdcardOutlined,
  SettingOutlined,
  SafetyOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

export const siderItems = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: "reservations",
    label: "Reservations",
    type: "group",
    icon: <CalendarOutlined />,
    children: [
      {
        key: "/room-reservations",
        label: "Room Reservations",
        icon: <ScheduleOutlined />,
        privilege: "Room Reservation",
      },
      {
        key: "/room-reservation-amenities",
        label: "Reservation Amenities",
        icon: <GiftOutlined />,
        privilege: "Room Reservation Amenity",
      },
    ],
  },
  {
    key: "rooms",
    label: "Rooms & Types",
    type: "group",
    icon: <HomeOutlined />,
    children: [
      {
        key: "/rooms",
        label: "Manage Rooms",
        icon: <HomeOutlined />,
        privilege: "Room",
      },
      {
        key: "/room-types",
        label: "Room Types",
        icon: <AppstoreOutlined />,
        privilege: "Room Type",
      },
      {
        key: "/room-inventory",
        label: "Room Inventory",
        icon: <DatabaseOutlined />,
        privilege: "Room Inventory",
      },
    ],
  },
  {
    key: "packages",
    label: "Packages",
    type: "group",
    icon: <GiftOutlined />,
    children: [
      {
        key: "/packages",
        label: "Manage Packages",
        icon: <GiftOutlined />,
        privilege: "Package",
      },
    ],
  },
  {
    key: "inventory",
    label: "Inventory",
    type: "group",
    icon: <ShopOutlined />,
    children: [
      {
        key: "/inventory",
        label: "Manage Inventory",
        icon: <DatabaseOutlined />,
        privilege: "Inventory",
      },
    ],
  },
  {
    key: "people",
    label: "People",
    type: "group",
    icon: <TeamOutlined />,
    children: [
      {
        key: "/guests",
        label: "Guests",
        icon: <UserOutlined />,
        privilege: "Guest",
      },
      {
        key: "/employees",
        label: "Employees",
        icon: <IdcardOutlined />,
        privilege: "Employee",
      },
    ],
  },
  {
    key: "billing",
    label: "Billing",
    type: "group",
    icon: <DollarCircleOutlined />,
    children: [
      {
        key: "/billings",
        label: "Billings",
        icon: <DollarCircleOutlined />,
        privilege: "Billing",
      },
    ],
  },
  {
    key: "system",
    label: "System",
    type: "group",
    icon: <SettingOutlined />,
    children: [
      {
        key: "/users",
        label: "Users",
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
