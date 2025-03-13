import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

//define card actions based on privileges
const CardActions = (
  handleView,
  handleEdit,
  openDeleteModal,
  privileges,
  loadOneItem,
  data
) => {
  const actions = [];
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
        onClick={() => openDeleteModal(data)}
      />
    );
  }

  return { actions };
};

export default CardActions;
