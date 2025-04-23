import { Tag } from "antd";

import TableActions from "./TableActions";

// Tag colors for inventory status
const statusColors = {
  "In Stock": "green",
  "Out of Stock": "red",
  "Low Stock": "orange",
  Reserved: "yellow",
  Damaged: "grey",
  Disposed: "geekblue",
};

// column items for inventory table
export const InventoryColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
) => [
  {
    title: "Item Name",
    dataIndex: "itemName",
    sorter: true,
    fixed: "left",
  },
  {
    title: "Item Type",
    dataIndex: "itemType",
    render: (_, record) => record?.itemTypeName,
    sorter: true,
    align: "center",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: true,
    align: "center",
  },
  {
    title: "Used Quantity",
    dataIndex: "usedQuantity",
    sorter: true,
    align: "center",
  },
  {
    title: "Last Restocked Date",
    dataIndex: "lastRestockedDate",
    sorter: true,
    align: "center",
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
      />
    ),
  },
];
