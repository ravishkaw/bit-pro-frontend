import { Button, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const tagColor = (op) => (
  <Tag color={op ? "green" : "red"}>{op ? "Granted" : "Not Granted"}</Tag>
);

const PrivilegeColumnItems = (openDeleteModal, handleEdit) => [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
  },
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
      <Space size="small">
        <Button
          size="small"
          color="yellow"
          variant="outlined"
          onClick={() => handleEdit(record.id)}
        >
          <EditOutlined />
        </Button>
        <Button
          size="small"
          variant="outlined"
          danger
          onClick={() => openDeleteModal(record)}
        >
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];

export default PrivilegeColumnItems;
