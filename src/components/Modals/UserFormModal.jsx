import { Divider, Modal } from "antd";
import UserForm from "../Forms/UserForm";

// Modal of user form 
const UserFormModal = ({
  formModalState,
  closeFormModal,
  addAnUser,
  updateAnUser,
}) => {
  const { open, isEditing, selectedPerson } = formModalState;

  return (
    <Modal
      title="System User"
      open={open}
      onCancel={closeFormModal}
      width={600}
      destroyOnClose
      footer={null}
    >
      <Divider />
      <UserForm
        closeFormModal={closeFormModal}
        isEditing={isEditing}
        selectedPerson={selectedPerson}
        addAnUser={addAnUser}
        updateAnUser={updateAnUser}
      />
    </Modal>
  );
};
export default UserFormModal;
