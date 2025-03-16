import { Tag } from "antd";
import TableActions from "./TableActions";

// Tag colors for status
const statusColors = {
  Active: "green",
  Inactive: "orange",
  Deleted: "red",
};

// Room Type columns
export const RoomTypeColumns = (
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
    title: "Bed Type",
    dataIndex: "bedTypeName",
    sorter: true,
  },
  {
    title: "Base Price",
    dataIndex: "basePrice",
    sorter: true,
  },
  {
    title: "Price Today",
    dataIndex: "priceForDay",
    sorter: true,
  },
  {
    title: "Description",
    dataIndex: "description",
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
