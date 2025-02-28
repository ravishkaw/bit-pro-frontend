import { Tag } from "antd";
import TableActions from "./TableActions";

// Room PricingRules columns
export const PricingRulesColumnItems = (
  pricingRuleModulePrivileges,
  openDeleteModal,
  handleEdit,
  loadOnePricingRule
) => [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
  },
  {
    title: "Room Type",
    dataIndex: "roomType",
    render: (_, record) => record?.roomType?.name,
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
        modulePrivilege={pricingRuleModulePrivileges}
        apiFunction={loadOnePricingRule}
        record={record}
        handleEdit={handleEdit}
        openDeleteModal={openDeleteModal}
      />
    ),
  },
];
