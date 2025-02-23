import { Button, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";

// Column items for the user table
export const userColumnItems = (openDeleteModal, handleEdit) => {
  const { privileges } = useAuth();

  // Find the module related to "User" in the privileges
  const userModule = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === "User"
  );

  return [
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
      width: "20%",
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          {/* Show edit button if the user has update privilege */}
          {userModule?.update_privilege && (
            <Button
              size="small"
              color="yellow"
              variant="outlined"
              onClick={() => handleEdit(record.id)}
            >
              <EditOutlined />
            </Button>
          )}

          {/* Show delete button if the user has delete privilege */}
          {userModule?.delete_privilege && (
            <Button
              size="small"
              variant="outlined"
              danger
              onClick={() => openDeleteModal(record)}
            >
              <DeleteOutlined />
            </Button>
          )}
        </Space>
      ),
    },
  ];
};
