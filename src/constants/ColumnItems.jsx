import { Button, Space, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UndoOutlined,
} from "@ant-design/icons";

export const employeeColumnItems = (
  handleView,
  deleteAnEmployee,
  restoreAnEmployee
) => [
  {
    title: "Employee NO",
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
            handleView(record.employeeId);
          }}
        >
          <EditOutlined />
        </Button>
        {record.employeeStatus.name !== "Deleted" ? (
          <Popconfirm
            title="Delete the Employee"
            description="Are you sure to delete this Employee?"
            onConfirm={() => deleteAnEmployee(record.employeeId)}
            okText="Delete"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" variant="outlined" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        ) : (
          <Popconfirm
            title="Restore the Employee"
            description="Are you sure to restore?"
            onConfirm={() => restoreAnEmployee(record.employeeId)}
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
