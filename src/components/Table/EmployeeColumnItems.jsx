import { Tag } from "antd";

import TableActions from "./TableActions";

// Tag colors for employee status
const statusColors = {
  Active: "green",
  Resigned: "red",
  "On Leave": "orange",
  Deleted: "gray",
};

// Column items for the Employee table
export const employeeColumnItems = (
  modulePrivileges,
  openDeleteModal,
  handleEdit,
  loadOneItem,
  handleView
) => [
  {
    title: "Employee No",
    dataIndex: "empNo",
    sorter: true,
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    sorter: true,
    fixed: "left",
  },
  {
    title: "Calling Name",
    dataIndex: "callingName",
    sorter: true,
  },
  {
    title: "Phone",
    dataIndex: "mobileNo",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Designation",
    dataIndex: "designation",
    sorter: true,
    render: (_, record) => record.designation?.name || "N/A",
  },
  {
    title: "Status",
    dataIndex: "employeeStatus",
    sorter: true,
    render: (_, record) => {
      const statusName = record.employeeStatus?.name || "N/A";
      return (
        <Tag color={statusColors[statusName] || "default"}>{statusName}</Tag>
      );
    },
  },
  {
    title: "Actions",
    key: "operation",
    fixed: "right",
    render: (_, record) => (
      <TableActions
        modulePrivilege={modulePrivileges}
        apiFunction={loadOneItem}
        record={record}
        handleEdit={handleEdit}
        handleView={handleView}
        showView={true}
        openDeleteModal={openDeleteModal}
      />
    ),
  },
];
