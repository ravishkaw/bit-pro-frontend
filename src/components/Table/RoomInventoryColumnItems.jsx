import { Tag } from "antd";
import TableActions from "./TableActions";

// Create table columns with permission-based edit/delete actions
export const RoomInventoryColumnItems = (
  modulePrivileges,
  openDeleteModal,
  handleEdit,
  loadOneItem
) => [
  {
    title: "Room No",
    dataIndex: "roomNumber",
    sorter: true,
  },
  {
    title: "Item Name",
    dataIndex: "inventoryItemName",
    sorter: true,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: true,
  },
  {
    title: "Last Checked Date",
    dataIndex: "lastCheckedDate",
    ellipsis: true,
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
