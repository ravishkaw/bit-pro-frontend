import {
  CalendarOutlined,
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
  KeyOutlined,
  ToolOutlined,
  ContainerOutlined,
  CalendarFilled,
  BuildOutlined,
  TagsOutlined,
  SecurityScanOutlined,
  SolutionOutlined,
  CreditCardOutlined,
  PieChartOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";

export const siderItems = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <PieChartOutlined />,
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
        icon: <KeyOutlined />,
        privilege: "Room Reservation",
      },
      {
        key: "/event-reservations",
        label: "Event Reservations",
        icon: <ScheduleOutlined />,
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
        label: "Room Types",
        icon: <TagsOutlined />,
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
    key: "events",
    label: "Event Management",
    type: "group",
    icon: <CalendarFilled />,
    children: [
      {
        key: "/event-venues",
        label: "Event Venues",
        icon: <BuildOutlined />,
        privilege: "Event Venue",
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
        label: "Packages",
        icon: <ShopOutlined />,
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
    icon: <DatabaseOutlined />,
    children: [
      {
        key: "/inventory",
        label: "Stock Management",
        icon: <ContainerOutlined />,
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
        label: "Guest Management",
        icon: <SolutionOutlined />,
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
    label: "Financial Operations",
    type: "group",
    icon: <DollarCircleOutlined />,
    children: [
      {
        key: "/billings",
        label: "Billing & Payments",
        icon: <CreditCardOutlined />,
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
        icon: <SecurityScanOutlined />,
        privilege: "Privilege",
      },
    ],
  },
];
