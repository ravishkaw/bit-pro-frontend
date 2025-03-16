import { Button, Space } from "antd";
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
  isDeleted = false,
  opendeleteRestoreModal,
}) => {
  return (
    <Space size="small">
      {isDeleted ? (
        // Show undo button if status is deleted and user has update privilege
        modulePrivilege?.update_privilege && (
          <Button
            size="small"
            color="geekblue"
            variant="outlined"
            onClick={() => opendeleteRestoreModal(false, record)}
          >
            <UndoOutlined />
          </Button>
        )
      ) : (
        // Show regular action buttons if status is not deleted
        <>
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
              onClick={() => opendeleteRestoreModal(true, record)}
            >
              <DeleteOutlined />
            </Button>
          )}
        </>
      )}
    </Space>
  );
};
export default TableActions;
