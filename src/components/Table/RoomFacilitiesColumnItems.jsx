import { Tag } from "antd";
import TableActions from "./TableActions";

// Tag colors for status
const statusColors = {
  Active: "green",
  Inactive: "orange",
  Deleted: "red",
};

// Create table columns with permission-based edit/delete actions
export const RoomFacilitiesColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
) => [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
  },
  {
    title: "Description",
    dataIndex: "description",
    ellipsis: true,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: true,
    render: (_, record) => {
      const price = record.price || 0;
      return `${price.toLocaleString("en-LK", {
        style: "currency",
        currency: "LKR",
      })}`;
    },
  },
  {
    title: "Status",
    dataIndex: "statusName",
    render: (_, record) => {
      const statusName = record?.statusName || "N/A";
      return (
        <Tag color={statusColors[statusName] || "default"}>{statusName}</Tag>
      );
    },
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
