import { Tag } from "antd";
import TableActions from "./TableActions";

// Tag colors for status
const statusColors = {
  Active: "green",
  Inactive: "orange",
  Deleted: "red",
};

// Room PricingRules columns
export const PricingRulesColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
) => [
  {
    title: "Room Type",
    dataIndex: "roomTypeName",
    sorter: true,
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    sorter: true,
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    sorter: true,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Pricing Multiplier",
    dataIndex: "pricingMultiplier",
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
