import { Modal } from "antd";

const RoomForm = ({ isEditing, open, module, closeFormModal }) => {
  return (
    <Modal
      title={`${!isEditing ? "Add New" : "Update"} ${module}`}
      open={open}
      width={800}
      onCancel={closeFormModal}
      footer={null}
      destroyOnClose
    >
      <div>RoomForm</div>
    </Modal>
  );
};
export default RoomForm;
