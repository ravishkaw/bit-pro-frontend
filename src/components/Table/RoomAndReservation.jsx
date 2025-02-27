import { Tag } from "antd";
import TableActions from "./TableActions";

// Room Type columns
export const RoomTypeColumns = (
  roomTypeModulePrivileges,
  openDeleteModal,
  handleEdit,
  loadOneRoomType
) => [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    fixed: "left",
  },
  {
    title: "Base Price",
    dataIndex: "basePrice",
    sorter: true,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Status",
    dataIndex: "isDeleted",
    render: (_, record) =>
      record?.isDeleted == 0 ? (
        <Tag color="green">Active</Tag>
      ) : (
        <Tag color="red">Deleted</Tag>
      ),
  },
  {
    title: "Actions",
    key: "operation",
    fixed: "right",
    align: "center",
    render: (_, record) => (
      <TableActions
        modulePrivilege={roomTypeModulePrivileges}
        apiFunction={loadOneRoomType}
        record={record}
        handleEdit={handleEdit}
        openDeleteModal={openDeleteModal}
      />
    ),
  },
];
