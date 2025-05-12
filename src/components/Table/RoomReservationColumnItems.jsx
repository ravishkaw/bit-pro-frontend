import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ScheduleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Space, Tag, Tooltip } from "antd";

const statusColors = {
  Paid: "green",
  "Partially Paid": "orange",
  Pending: "red",
};

const confirmedActions = (record, handleView, handleEdit, loadOneItem) => {
  return (
    <Space size="small">
      <Tooltip title="View Details">
        <Button
          type="primary"
          ghost
          icon={<EyeOutlined />}
          onClick={() => handleView(loadOneItem, record.id)}
        />
      </Tooltip>
      <Tooltip title="Edit Reservation">
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record.id)}
        />
      </Tooltip>
      <Tooltip title="Check In">
        <Button
          type="primary"
          icon={<CheckCircleOutlined />}
          onClick={() => loadOneItem(record.id)}
        />
      </Tooltip>
    </Space>
  );
};

const currentActions = (record, handleView, handleEdit, loadOneItem) => {
  return (
    <Space size="small">
      <Tooltip title="View Details">
        <Button
          type="primary"
          ghost
          icon={<EyeOutlined />}
          onClick={() => handleView(loadOneItem, record.id)}
        />
      </Tooltip>
      <Tooltip title="Edit Reservation">
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record.id)}
        />
      </Tooltip>
      <Tooltip title="Check Out">
        <Button
          type="primary"
          icon={<ScheduleOutlined />}
          onClick={() => loadOneItem(record.id)}
        />
      </Tooltip>
    </Space>
  );
};

const pendingActions = (record, handleView, handleEdit, loadOneItem) => {
  return (
    <Space size="small">
      <Tooltip title="View Details">
        <Button
          type="primary"
          ghost
          icon={<EyeOutlined />}
          onClick={() => handleView(loadOneItem, record.id)}
        />
      </Tooltip>
      <Tooltip title="Edit Reservation">
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record.id)}
        />
      </Tooltip>
      <Tooltip title="Confirm Reservation">
        <Button
          type="primary"
          icon={<CheckCircleOutlined />}
          onClick={() => loadOneItem(record.id)}
        />
      </Tooltip>
      <Tooltip title="Cancel Reservation">
        <Button
          danger
          icon={<CloseCircleOutlined />}
          onClick={() => loadOneItem(record.id)}
        />
      </Tooltip>
    </Space>
  );
};

const completedActions = (record, handleView, loadOneItem) => {
  return (
    <Space size="small">
      <Tooltip title="View Details">
        <Button
          type="primary"
          ghost
          icon={<EyeOutlined />}
          onClick={() => handleView(loadOneItem, record.id)}
        />
      </Tooltip>
    </Space>
  );
};

const cancelledActions = (record, handleView, loadOneItem) => {
  return (
    <Space size="small">
      <Tooltip title="View Details">
        <Button
          type="primary"
          ghost
          icon={<EyeOutlined />}
          onClick={() => handleView(loadOneItem, record.id)}
        />
      </Tooltip>
      <Tooltip title="Reactivate">
        <Button
          type="default"
          icon={<InfoCircleOutlined />}
          onClick={() => loadOneItem(record.id)}
        />
      </Tooltip>
    </Space>
  );
};

const noShowActions = (record, handleView, loadOneItem) => {
  return (
    <Space size="small">
      <Tooltip title="View Details">
        <Button
          type="primary"
          ghost
          icon={<EyeOutlined />}
          onClick={() => handleView(loadOneItem, record.id)}
        />
      </Tooltip>
      <Tooltip title="Mark As Checked-In">
        <Button
          type="default"
          icon={<ExclamationCircleOutlined />}
          onClick={() => loadOneItem(record.id)}
        />
      </Tooltip>
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
  },
  {
    title: "Total",
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
    title: (
      <span style={{ whiteSpace: "normal" }}>
        Reserved
        <br />
        Check-In
      </span>
    ),
    dataIndex: "reservedCheckInDate",
    render: (_, record) => {
      const date = record.reservedCheckInDate;
      return date ? date.substring(0, 10) : "N/A";
    },
    sorter: true,
    align: "center",
  },
  {
    title: (
      <span style={{ whiteSpace: "normal" }}>
        Reserved
        <br />
        Check-Out
      </span>
    ),
    dataIndex: "reservedCheckOutDate",
    render: (_, record) => {
      const date = record.reservedCheckOutDate;
      return date ? date.substring(0, 10) : "N/A";
    },
    sorter: true,
    align: "center",
  },
  {
    title: (
      <span style={{ whiteSpace: "normal" }}>
        Actual
        <br />
        Check-In
      </span>
    ),
    dataIndex: "actualCheckInDate",
    render: (_, record) => {
      const date = record.checkInDate;
      return date ? date.substring(0, 10) : "N/A";
    },
    sorter: true,
    align: "center",
  },
  {
    title: (
      <span style={{ whiteSpace: "normal" }}>
        Actual
        <br />
        Check-Out
      </span>
    ),
    dataIndex: "actualCheckOutDate",
    render: (_, record) => {
      const date = record.checkOutDate;
      return date ? date.substring(0, 10) : "N/A";
    },
    sorter: true,
    align: "center",
  },
  {
    title: (
      <span style={{ whiteSpace: "normal" }}>
        Total
        <br />
        Price
      </span>
    ),
    dataIndex: "totalPrice",
    render: (_, record) => {
      const totalPrice = record.totalPrice || 0;
      return `${totalPrice.toLocaleString("en-LK", {
        style: "currency",
        currency: "LKR",
      })}`;
    },
    align: "center",
  },
  {
    title: (
      <span style={{ whiteSpace: "normal" }}>
        Payment
        <br />
        Status
      </span>
    ),
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
      const status = record?.roomReservationStatusName;

      switch (status) {
        case "CONFIRMED":
          return confirmedActions(record, handleView, handleEdit, loadOneItem);
        case "CHECKED-IN":
          return currentActions(record, handleView, handleEdit, loadOneItem);
        case "PENDING":
          return pendingActions(record, handleView, handleEdit, loadOneItem);
        case "CHECKED-OUT":
          return completedActions(record, handleView, loadOneItem);
        case "CANCELLED":
          return cancelledActions(record, handleView, loadOneItem);
        case "NO-SHOW":
          return noShowActions(record, handleView, loadOneItem);
        default:
          return (
            <Button
              type="primary"
              ghost
              icon={<EyeOutlined />}
              onClick={() => handleView(loadOneItem, record.id)}
            />
          );
      }
    },
  },
];
