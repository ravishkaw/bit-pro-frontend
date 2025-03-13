import { Tag } from "antd";
import TableActions from "./TableActions";

// Room PricingRules columns
export const PricingRulesColumnItems = (
  modulePrivileges,
  openDeleteModal,
  handleEdit,
  loadOneItem
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
    render: (_, record) =>
      record?.statusName == "Active" ? (
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
        modulePrivilege={modulePrivileges}
        apiFunction={loadOneItem}
        record={record}
        handleEdit={handleEdit}
        openDeleteModal={openDeleteModal}
      />
    ),
  },
];
