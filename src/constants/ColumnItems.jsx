import { Button, Space, Popconfirm } from "antd";
import { DeleteOutlined, EyeOutlined, UndoOutlined } from "@ant-design/icons";

export const employeeColumnItems = (
  handleView,
  deleteAnEmployee,
  restoreAnEmployee
) => [
  {
    title: "Employee ID",
    dataIndex: "employeeId",
    fixed: "left",
  },
  {
    title: "Name",
    dataIndex: "name",
    fixed: "left",
  },
  {
    title: "NIC Number",
    dataIndex: "nic",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Job Role",
    dataIndex: "jobRole",
  },
  {
    title: "Status",
    dataIndex: "status",
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
          <EyeOutlined />
        </Button>
        {record.status !== "deleted" ? (
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
