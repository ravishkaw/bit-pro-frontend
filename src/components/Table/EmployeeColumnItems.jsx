import { Button, Space, Popconfirm, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UndoOutlined,
} from "@ant-design/icons";

// Tag colors for employee status
const statusColors = {
  Active: "green",
  Resigned: "red",
  "On Leave": "orange",
  Deleted: "gray",
};

// Employee table column items
export const employeeColumnItems = (
  handleView,
  handleEdit,
  openDeleteModal,
  restoreAnEmployee
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
      <Space size="small">
        <Button
          size="small"
          color="blue"
          variant="outlined"
          onClick={() => {
            handleView(record.id);
          }}
        >
          <EyeOutlined />
        </Button>
        <Button
          size="small"
          color="yellow"
          variant="outlined"
          onClick={() => {
            handleEdit(record.id);
          }}
        >
          <EditOutlined />
        </Button>
        {record.employeeStatus.name !== "Deleted" ? (
          <Button
            size="small"
            variant="outlined"
            danger
            onClick={() => openDeleteModal(record)}
          >
            <DeleteOutlined />
          </Button>
        ) : (
          <Popconfirm
            title="Restore the Employee"
            description="Are you sure to restore?"
            onConfirm={() => restoreAnEmployee(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" variant="outlined">
              <UndoOutlined />
            </Button>
          </Popconfirm>
        )}
      </Space>
    ),
  },
];
