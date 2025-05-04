import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Button, Space, Tag } from "antd";

const statusColors = {
  Paid: "green",
  "Partially Paid": "orange",
  Pending: "red",
};

const confirmedActions = (record) => {
  return (
    <Space size="small">
      <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
      <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
      <Button
        icon={<DeleteOutlined />}
        onClick={() => loadOneItem(record.id)}
      />
    </Space>
  );
};

const currentActions = (record) => {
  return (
    <Space size="small">
      <Button
        size="small"
        icon={<EditOutlined />}
        onClick={() => handleEdit(record)}
      >
        Update
      </Button>
      <Button
        size="small"
        icon={<ScheduleOutlined />}
        onClick={() => loadOneItem(record.id)}
      >
        Check Out
      </Button>
    </Space>
  );
};

// Create table columns with permission-based edit/delete actions
export const RoomReservationColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView
) => [
  {
    title: "Primary Guest",
    dataIndex: "primaryGuestFullName",
    fixed: "left",
  },
  {
    title: "Total Guests",
    dataIndex: "totalGuests",
    render: (_, record) => {
      const adults = record.adultNo || 0;
      const children = record.childNo || 0;
      const infants = record.infantNo || 0;
      return adults + children + infants;
    },
    align: "center",
  },
  {
    title: "Room",
    dataIndex: "roomNumber",
    align: "center",
  },
  {
    title: "Check-In",
    dataIndex: "reservedCheckInDate",
    render: (_, record) => {
      const date = record.checkInDate || record.reservedCheckInDate;
      return date ? date.substring(0, 10) : "";
    },
    sorter: true,
  },
  {
    title: "Check-Out",
    dataIndex: "reservedCheckOutDate",
    render: (_, record) => {
      const date = record.checkOutDate || record.reservedCheckOutDate;
      return date ? date.substring(0, 10) : "";
    },
    sorter: true,
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    render: (_, record) => {
      const totalPrice = record.totalPrice || 0;
      return `${totalPrice.toLocaleString("en-LK", {
        style: "currency",
        currency: "LKR",
      })}`;
    },
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatusName",
    align: "center",
    render: (_, record) => {
      const status = record.paymentStatusName;
      return <Tag color={statusColors[status]}>{status}</Tag>;
    },
  },
  {
    title: "Actions",
    key: "operation",
    fixed: "right",
    align: "center",
    render: (_, record) => {
      if (record?.roomReservationStatusName === "CONFIRMED") {
        return confirmedActions(record);
      }
      if (record?.roomReservationStatusName === "CHECKED-IN") {
        return currentActions(record);
      }
    },
  },
];
