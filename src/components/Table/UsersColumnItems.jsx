import { Tag } from "antd";

import TableActions from "./TableActions";

// Tag colors for status
const statusColors = {
  Active: "green",
  Inactive: "orange",
  Deleted: "red",
};

// Column items for the user table
export const userColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
) => [
  {
    title: "Employee Name",
    dataIndex: "employeeFullName",
    sorter: true,
    fixed: "left",
  },
  {
    title: "Username",
    dataIndex: "username",
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: true,
  },
  {
    title: "Account Status",
    dataIndex: "statusName",
    render: (_, record) => {
      const statusName = record?.statusName || "N/A";
      return (
        <Tag color={statusColors[statusName] || "default"}>{statusName}</Tag>
      );
    },
    sorter: true,
    align: "center",
  },
  {
    title: "Role",
    dataIndex: "role",
    render: (_, record) =>
      record?.role.map((roles, index) => (
        <Tag color="geekblue" key={index}>
          {roles.name}
        </Tag>
      )),
    align: "center",
    width: "20%",
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
