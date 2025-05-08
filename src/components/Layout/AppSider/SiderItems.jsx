import {
  DashboardOutlined,
  CalendarOutlined,
  BookOutlined,
  GiftOutlined,
  HomeOutlined,
  DatabaseOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  IdcardOutlined,
  SettingOutlined,
  DollarCircleOutlined,
  BankOutlined,
  CoffeeOutlined,
  FileProtectOutlined,
  KeyOutlined,
  AuditOutlined,
  ToolOutlined,
  ContainerOutlined,
  ApartmentOutlined,
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
        label: "Room Bookings",
        icon: <KeyOutlined />,
        privilege: "Room Reservation",
      },
      {
        key: "/event-reservations",
        label: "Event Bookings",
        icon: <BookOutlined />,
        privilege: "Event Reservation",
      },
    ],
  },
  {
    key: "rooms",
    label: "Accommodations",
    type: "group",
    icon: <BankOutlined />,
    children: [
      {
        key: "/rooms",
        label: "Rooms",
        icon: <HomeOutlined />,
        privilege: "Room",
      },
      {
        key: "/room-types",
        label: "Room Categories",
        icon: <ApartmentOutlined />,
        privilege: "Room Type",
      },
      {
        key: "/room-inventory",
        label: "Room Inventory",
        icon: <ContainerOutlined />,
        privilege: "Room Inventory",
      },
    ],
  },
  {
    key: "packages",
    label: "Packages & Services",
    type: "group",
    icon: <GiftOutlined />,
    children: [
      {
        key: "/packages",
        label: "Package Offerings",
        icon: <GiftOutlined />,
        privilege: "Package",
      },
      {
        key: "/room-reservation-amenities",
        label: "Room Amenities",
        icon: <CoffeeOutlined />,
        privilege: "Room Reservation Amenity",
      },
      {
        key: "/event-reservation-services",
        label: "Event Services",
        icon: <ToolOutlined />,
        privilege: "Event Reservation Service",
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
        label: "Stock Management",
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
        label: "Guest Records",
        icon: <UserOutlined />,
        privilege: "Guest",
      },
      {
        key: "/employees",
        label: "Staff Management",
        icon: <IdcardOutlined />,
        privilege: "Employee",
      },
    ],
  },
  {
    key: "billing",
    label: "Finance",
    type: "group",
    icon: <DollarCircleOutlined />,
    children: [
      {
        key: "/billings",
        label: "Billing & Payments",
        icon: <AuditOutlined />,
        privilege: "Billing",
      },
    ],
  },
  {
    key: "system",
    label: "Administration",
    type: "group",
    icon: <SettingOutlined />,
    children: [
      {
        key: "/users",
        label: "User Accounts",
        icon: <UserOutlined />,
        privilege: "User",
      },
      {
        key: "/privileges",
        label: "Access Control",
        icon: <FileProtectOutlined />,
        privilege: "Privilege",
      },
    ],
  },
];
