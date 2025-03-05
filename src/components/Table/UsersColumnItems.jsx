import { Tag } from "antd";

import TableActions from "./TableActions";

// Column items for the user table
export const userColumnItems = (
  modulePrivileges,
  openDeleteModal,
  handleEdit,
  loadOneItem
) => [
  {
    title: "Employee Name",
    dataIndex: "employeeId",
    render: (_, record) => record.employeeId?.fullName,
    // sorter: true,
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
    dataIndex: "status",
    render: (_, record) =>
      record.status.name == "Active" ? (
        <Tag color="green">Active</Tag>
      ) : (
        <Tag color="red">Inactive</Tag>
      ),
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
        openDeleteModal={openDeleteModal}
      />
    ),
  },
];
