import { Button, Space, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UndoOutlined,
} from "@ant-design/icons";

const TableActions = ({
  modulePrivilege,
  apiFunction,
  record,
  handleEdit,
  handleView,
  showView = false,
  openDeleteModal,
}) => {
  return (
    <Space size="small">
      {modulePrivilege?.select_privilege && showView && (
        <Button
          size="small"
          color="blue"
          variant="outlined"
          onClick={() => {
            handleView(apiFunction, record.id);
          }}
        >
          <EyeOutlined />
        </Button>
      )}

      {/* Show edit button if the user has update privilege */}
      {modulePrivilege?.update_privilege && (
        <Button
          size="small"
          color="yellow"
          variant="outlined"
          onClick={() => handleEdit(apiFunction, record.id)}
        >
          <EditOutlined />
        </Button>
      )}

      {/* Show delete button if the user has delete privilege */}
      {modulePrivilege?.delete_privilege && (
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
  );
};
export default TableActions;
