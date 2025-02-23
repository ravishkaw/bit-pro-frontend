import { Modal } from "antd";

// A modal to render anything inside
const GenericModal = ({ title, open, onCancel, width, footer, children }) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      width={width}
      destroyOnClose
      footer={footer}
    >
      {children}
    </Modal>
  );
};

export default GenericModal;
