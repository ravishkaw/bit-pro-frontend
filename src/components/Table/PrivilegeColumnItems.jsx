import { Tag } from "antd";

import TableActions from "./TableActions";

// Tag colors for operations
const tagColor = (op) => (
  <Tag color={op ? "green" : "red"}>{op ? "Granted" : "Not Granted"}</Tag>
);

// Column items for the privilege table
const PrivilegeColumnItems = (
  modulePrivileges,
  openDeleteModal,
  handleEdit,
  loadOneItem
) => [
  // {
  //   title: "ID",
  //   dataIndex: "id",
  //   sorter: true,
  // },
  {
    title: "Role",
    dataIndex: "roleId",
    render: (_, record) => record?.roleId?.name,
    sorter: true,
    fixed: "left",
  },
  {
    title: "Module",
    dataIndex: "moduleId",
    render: (_, record) => record?.moduleId?.name,
    sorter: true,
  },
  {
    title: "Select",
    dataIndex: "selectOp",
    render: (selectOp) => tagColor(selectOp),
    align: "center",
  },
  {
    title: "Insert",
    dataIndex: "insertOp",
    render: (insertOp) => tagColor(insertOp),
    align: "center",
  },
  {
    title: "Update",
    dataIndex: "updateOp",
    render: (updateOp) => tagColor(updateOp),
    align: "center",
  },
  {
    title: "Delete",
    dataIndex: "deleteOp",
    render: (deleteOp) => tagColor(deleteOp),
    align: "center",
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

export default PrivilegeColumnItems;
