import { Image, Tag } from "antd";

import TableActions from "./TableActions";

// Tag colors for status
const statusColors = {
  Active: "green",
  Inactive: "orange",
  Deleted: "red",
};

// Column items for the user table
export const EventVenueColumnItems = (
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
    fixed: "left",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    sorter: true,
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: true,
  },
  {
    title: "Photo",
    render: (_, record) => {
      const photo = record?.photo || "";
      return (
        <img
          src={import.meta.env.VITE_IMAGE_URL + photo}
          alt="Venue"
          style={{ width: "50px", height: "50px", borderRadius: "5px" }}
        />
      );
    },
    dataIndex: "photo",
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
