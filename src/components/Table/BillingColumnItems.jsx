import TableActions from "./TableActions";

// Column items for the billing table
export const BillingColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
) => [
  {
    title: "Billing ID",
    dataIndex: "id",
    sorter: true,
    fixed: "left",
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    sorter: true,
  },
  {
    title: "Payment Method",
    dataIndex: "paymentMethodName",
    sorter: true,
  },
  {
    title: "Paid Amount",
    dataIndex: "paidAmount",
    sorter: true,
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatusName",
    sorter: true,
  },
];
