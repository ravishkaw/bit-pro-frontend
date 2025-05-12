import { Button, Space, Tooltip } from "antd";
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
          <Tooltip title="Restore">
            <Button
              color="green"
              variant="outlined"
              onClick={() => opendeleteRestoreModal(false, record)}
              icon={<UndoOutlined />}
            />
          </Tooltip>
        )
      ) : (
        // Show regular action buttons if status is not deleted
        <>
          {modulePrivilege?.select_privilege && showView && (
            <Tooltip title="View Details">
              <Button
                color="blue"
                variant="outlined"
                onClick={() => {
                  handleView(apiFunction, record.id);
                }}
                icon={<EyeOutlined />}
              />
            </Tooltip>
          )}

          {/* Show edit button if the user has update privilege */}
          {modulePrivilege?.update_privilege && (
            <Tooltip title="Edit">
              <Button
                onClick={() => handleEdit(apiFunction, record.id)}
                icon={<EditOutlined />}
              />
            </Tooltip>
          )}

          {/* Show delete button if the user has delete privilege */}
          {modulePrivilege?.delete_privilege && (
            <Tooltip title="Delete">
              <Button
                variant="outlined"
                danger
                onClick={() => opendeleteRestoreModal(true, record)}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          )}
        </>
      )}
    </Space>
  );
};
export default TableActions;
