import { Modal } from "antd";

const RoomInventoryForm = ({ isEditing, open, module, closeFormModal }) => {
  return (
    <Modal
      title={`${!isEditing ? "Add New" : "Update"} ${module}`}
      open={open}
      width={800}
      onCancel={closeFormModal}
      footer={null}
      destroyOnClose
    >
      <div>RoomInventoryForm</div>
    </Modal>
  );
};
export default RoomInventoryForm;
