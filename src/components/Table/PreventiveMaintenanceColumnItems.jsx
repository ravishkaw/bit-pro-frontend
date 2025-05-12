import { Tag } from "antd";
import TableActions from "./TableActions";

// Tag colors for status
const statusColors = {
  Completed: "green",
  "In Progress": "orange",
  "Not Started": "red",
  "On Hold": "blue",
  Cancelled: "gray",
  Pending: "purple",
};

// Helper function for formatting dates
const formatDateTime = (dateTime) => {
  if (!dateTime || dateTime === "N/A") return <span>N/A</span>;

  return (
    <span>
      {new Date(dateTime).toLocaleString("en-LK", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}
    </span>
  );
};

// task columns
export const PreventiveMaintenanceColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
) => [
  {
    title: "Room",
    dataIndex: "roomNumber",
    sorter: true,
    fixed: "left",
  },
  {
    title: "Maintenance Type",
    dataIndex: "maintenanceType",
    sorter: true,
  },
  {
    title: "Scheduled Date",
    dataIndex: "scheduledDate",
    render: (_, record) => formatDateTime(record?.scheduledDate),
    sorter: true,
  },
  {
    title: "Completed Date",
    dataIndex: "completedDate",
    render: (_, record) => formatDateTime(record?.completedDate),
    sorter: true,
  },

  {
    title: "Status",
    dataIndex: "maintenanceStatusName",
    render: (_, record) => {
      const statusName = record?.maintenanceStatusName || "N/A";
      return (
        <Tag color={statusColors[statusName] || "default"}>{statusName}</Tag>
      );
    },
    align: "center",
    sorter: true,
  },
  {
    title: "Actions",
    key: "operation",
    fixed: "right",
    align: "center",
    render: (_, record) => (
      <TableActions
        modulePrivilege={modulePrivileges}
        apiFunction={loadOneItem}
        record={record}
        handleEdit={handleEdit}
        opendeleteRestoreModal={opendeleteRestoreModal}
        isDeleted={record?.statusName === "Deleted"}
      />
    ),
  },
];
