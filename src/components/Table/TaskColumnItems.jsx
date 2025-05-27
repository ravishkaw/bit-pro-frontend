import { Tag } from "antd";
import TableActions from "./TableActions";

// Tag colors for status
const statusColors = {
  Completed: "green",
  "In Progress": "orange",
  "Not Started": "red",
  Deferred: "blue",
  Cancelled: "gray",
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
export const TaskColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
) => [
  {
    title: "Type",
    dataIndex: "targetTypeName",
    sorter: true,
    fixed: "left",
  },
  {
    title: "Room / Venue",
    dataIndex: "targetName",
  },
  {
    title: "Assigned To",
    dataIndex: "assignedToCallingName",
    sorter: true,
  },
  {
    title: "Task Type",
    dataIndex: "taskTypeName",
    sorter: true,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Start Time",
    dataIndex: "scheduledStartTime",
    render: (_, record) => formatDateTime(record?.scheduledStartTime),
    sorter: true,
  },
  {
    title: "End Time",
    dataIndex: "scheduledEndTime",
    render: (_, record) => formatDateTime(record?.scheduledEndTime),
    sorter: true,
  },
  {
    title: "Actual Start Time",
    dataIndex: "actualStartTime",
    render: (_, record) => formatDateTime(record?.actualStartTime),
    sorter: true,
  },
  {
    title: "Actual End Time",
    dataIndex: "actualEndTime",
    render: (_, record) => formatDateTime(record?.actualEndTime),
    sorter: true,
  },
  {
    title: "Status",
    dataIndex: "taskStatusName",
    render: (_, record) => {
      const statusName = record?.taskStatusName || "N/A";
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
