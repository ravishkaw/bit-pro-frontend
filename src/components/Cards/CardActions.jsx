import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UndoOutlined,
} from "@ant-design/icons";

import { theme } from "antd";

//define card actions based on privileges
const CardActions = (
  handleView,
  handleEdit,
  opendeleteRestoreModal,
  privileges,
  loadOneItem,
  data,
  showView
) => {
  const actions = [];
  const { token } = theme.useToken();

  if (
    (data?.statusName === "Deleted" ||
      data?.employeeStatus?.name === "Deleted") &&
    privileges?.select_privilege
  ) {
    actions.push(
      <UndoOutlined
        style={{ color: token.colorPrimary }}
        onClick={() => opendeleteRestoreModal(false, data)}
      />
    );
    return { actions };
  }

  if (privileges?.select_privilege && showView) {
    actions.push(
      <EyeOutlined
        style={{ color: token.colorInfo }}
        onClick={() => handleView(loadOneItem, data.id)}
      />
    );
  }
  if (privileges?.update_privilege) {
    actions.push(
      <EditOutlined
        onClick={() => handleEdit(loadOneItem, data.id)}
      />
    );
  }
  if (privileges?.delete_privilege) {
    actions.push(
      <DeleteOutlined
        style={{ color: token.colorError }}
        onClick={() => opendeleteRestoreModal(true, data)}
      />
    );
  }

  return { actions };
};

export default CardActions;
