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
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
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
    render: (_, record) => record?.designationName || "N/A",
  },
  {
    title: "Status",
    dataIndex: "employeeStatus",
    sorter: true,
    render: (_, record) => {
      const statusName = record?.employeeStatusName || "N/A";
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
        handleView={handleView}
        showView={true}
        opendeleteRestoreModal={opendeleteRestoreModal}
        isDeleted={record?.employeeStatusName === "Deleted"}
      />
    ),
  },
];
