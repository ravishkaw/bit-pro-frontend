import { Tag } from "antd";

import TableActions from "./TableActions";

// Tag colors for operations
const tagColor = (op) => (
  <Tag color={op ? "green" : "red"}>{op ? "Granted" : "Not Granted"}</Tag>
);

// Column items for the privilege table
const PrivilegeColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
) => [
  // {
  //   title: "ID",
  //   dataIndex: "id",
  //   sorter: true,
  // },
  {
    title: "Role",
    dataIndex: "role",
    render: (_, record) => record?.role?.name,
    sorter: true,
    fixed: "left",
  },
  {
    title: "Module",
    dataIndex: "module",
    render: (_, record) => record?.module?.name,
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
        opendeleteRestoreModal={opendeleteRestoreModal}
      />
    ),
  },
];

export default PrivilegeColumnItems;
