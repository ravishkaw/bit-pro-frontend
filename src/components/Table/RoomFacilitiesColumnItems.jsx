import { Tag } from "antd";
import TableActions from "./TableActions";

// Create table columns with permission-based edit/delete actions
export const RoomFacilitiesColumnItems = (
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
    dataIndex: "status",
    render: (_, record) =>
      record?.status.name == "Active" ? (
        <Tag color="green">Available</Tag>
      ) : (
        <Tag color="red">Unavailable</Tag>
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
