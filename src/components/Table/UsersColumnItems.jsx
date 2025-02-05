import { Button, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

export const userColumnItems = () => [
  {
    title: "Employee Name",
    dataIndex: "employeeId",
    render: (_, record) => record.employeeId?.fullName,
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
  },
  {
    title: "Account Status",
    dataIndex: "accountStatus",
    render: (_, record) =>
      record.accountStatus == 0 ? (
        <Tag color="red">Inactive</Tag>
      ) : (
        <Tag color="green">Active</Tag>
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
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="small">
        {/* <Button size="small" color="blue" variant="outlined" onClick={() => {}}>
          <EyeOutlined />
          </Button> */}
        <Button
          size="small"
          color="yellow"
          variant="outlined"
          onClick={() => {}}
        >
          <EditOutlined />
        </Button>
        <Button size="small" variant="outlined" danger onClick={() => {}}>
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];
