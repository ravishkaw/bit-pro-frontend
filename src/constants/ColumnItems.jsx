import { Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

export const employeeColumnItems = (handleView) => [
  {
    title: "Employee ID",
    dataIndex: "employeeID",
    fixed: "left",
  },
  {
    title: "Name",
    dataIndex: "name",
    fixed: "left",
  },
  {
    title: "NIC Number",
    dataIndex: "nicNumber",
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
            handleView();
          }}
        >
          <EyeOutlined />
        </Button>
        <Button size="small" variant="outlined" danger>
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];
