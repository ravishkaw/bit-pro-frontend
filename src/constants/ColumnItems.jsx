import { Button, Space, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UndoOutlined,
} from "@ant-design/icons";

export const employeeColumnItems = (
  handleView,
  openDeleteModal,
  restoreAnEmployee
) => [
  {
    title: "Employee No",
    dataIndex: "empNo",
    fixed: "left",
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    fixed: "left",
  },
  {
    title: "Calling Name",
    dataIndex: "callingName",
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
    render: (_, record) => record.designation?.name || "N/A",
  },
  {
    title: "Status",
    dataIndex: "employeeStatus",
    render: (_, record) => record.employeeStatus?.name || "N/A",
  },
  {
    title: "Actions",
    key: "operation",
    fixed: "right",
    render: (_, record) => (
      <Space size="small">
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            handleView(record.id);
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
