import { Tag } from "antd";
import TableActions from "./TableActions";

// Create table columns with permission-based edit/delete actions
export const AmenityColumnItems = (
  modulePrivileges,
  openDeleteModal,
  handleEdit,
  loadOneItem
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
  },
  {
    title: "Status",
    dataIndex: "isDeleted",
    render: (isDeleted) => (
      <Tag color={!isDeleted ? "green" : "red"}>
        {!isDeleted ? "Active" : "Inactive"}
      </Tag>
    ),
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
        openDeleteModal={openDeleteModal}
      />
    ),
  },
];
