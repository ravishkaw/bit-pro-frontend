import { Modal } from "antd";

const InventoryForm = ({
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateModal,
}) => {
  return (
    <Modal
      title={`${!isEditing ? "Add New" : "Update"} ${module}`}
      open={open}
      width={800}
      onCancel={closeFormModal}
      footer={null}
      destroyOnClose
    >
      InventoryForm
    </Modal>
  );
};

export default InventoryForm;
