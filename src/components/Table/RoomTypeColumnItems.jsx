import { Tag } from "antd";
import TableActions from "./TableActions";

// Room Type columns
export const RoomTypeColumns = (
  modulePrivileges,
  openDeleteModal,
  handleEdit,
  loadOneItem
) => [
  // {
  //   title: "ID",
  //   dataIndex: "id",
  //   sorter: true,
  // },
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
