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

// Column items for the Employee table
export const employeeColumnItems = (
  employeeModulePrivilege,
  handleView,
  handleEdit,
  loadOneEmployee,
  openDeleteModal
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
            handleView(loadOneEmployee, record.id);
          }}
        >
          <EyeOutlined />
        </Button>

        {/* Show edit button if the user has update privilege */}
        {employeeModulePrivilege?.update_privilege && (
          <Button
            size="small"
            color="yellow"
            variant="outlined"
            onClick={() => handleEdit(loadOneEmployee, record.id)}
          >
            <EditOutlined />
          </Button>
        )}

        {/* Show delete button if the user has delete privilege */}
        {employeeModulePrivilege?.delete_privilege && (
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
