import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UndoOutlined,
} from "@ant-design/icons";

//define card actions based on privileges
const CardActions = (
  handleView,
  handleEdit,
  opendeleteRestoreModal,
  privileges,
  loadOneItem,
  data
) => {
  const actions = [];

  if (
    (data?.statusName === "Deleted" ||
      data?.employeeStatus?.name === "Deleted") &&
    privileges.select_privilege
  ) {
    actions.push(
      <UndoOutlined
        style={{ color: "blue" }}
        onClick={() => opendeleteRestoreModal(false, data)}
      />
    );
    return { actions };
  }

  if (privileges.select_privilege) {
    actions.push(
      <EyeOutlined
        style={{ color: "blue" }}
        onClick={() => handleView(loadOneItem, data.id)}
      />
    );
  }
  if (privileges.update_privilege) {
    actions.push(
      <EditOutlined
        style={{ color: "#fadb14" }}
        onClick={() => handleEdit(loadOneItem, data.id)}
      />
    );
  }
  if (privileges.delete_privilege) {
    actions.push(
      <DeleteOutlined
        style={{ color: "red" }}
        onClick={() => opendeleteRestoreModal(true, data)}
      />
    );
  }

  return { actions };
};

export default CardActions;
