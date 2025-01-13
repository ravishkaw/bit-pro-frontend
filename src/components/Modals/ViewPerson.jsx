import { Modal } from "antd";

const ViewPerson = ({ personType, viewModal, setViewModal }) => {
  const { open, selectedPerson } = viewModal;

  const closeViewModal = () => {
    setViewModal({ open: false, selectedPerson: null });
  };

  return (
    <>
      <Modal
        title={`View ${personType} Details`}
        open={open}
        onCancel={closeViewModal}
        maskClosable={false}
        width={850}
        // footer={null}
      >
        {JSON.stringify(selectedPerson)}
      </Modal>
    </>
  );
};
export default ViewPerson;
