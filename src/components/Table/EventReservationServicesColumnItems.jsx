import { Tag } from "antd";

import TableActions from "./TableActions";

// Tag colors for status
const statusColors = {
  Active: "green",
  Inactive: "orange",
  Deleted: "red",
};

// Column items for the user table
export const EventReservationServicesColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
) => [
  {
    title: "Service Name",
    dataIndex: "name",
    sorter: true,
    fixed: "left",
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: true,
  },
  {
    title: "Price",
    dataIndex: "pricePerUnit",
    sorter: true,
    render: (_, record) => {
      const price = record.pricePerUnit || 0;
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
    align: "center",
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
