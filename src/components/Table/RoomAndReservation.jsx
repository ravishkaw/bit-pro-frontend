import { Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { useAuth } from "../../contexts/AuthContext";

// Room Type columns
export const RoomTypeColumns = (openDeleteModal, handleEdit) => {
  const { privileges } = useAuth();

  // Find the module related to "Employee" in the privileges
  const roomTypeModule = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === "Room Type"
  );

  return [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      fixed: "left",
    },
    {
      title: "Base Price",
      dataIndex: "basePrice",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          {/* Show edit button if the user has update privilege */}
          {roomTypeModule?.update_privilege && (
            <Button
              size="small"
              color="yellow"
              variant="outlined"
              onClick={() => handleEdit(record.id)}
            >
              <EditOutlined />
            </Button>
          )}

          {/* Show edit button if the user has update privilege */}
          {roomTypeModule?.delete_privilege && (
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
