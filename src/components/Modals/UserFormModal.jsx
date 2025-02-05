import { Divider, Flex, Modal } from "antd";
import UserForm from "../Forms/UserForm";

const UserFormModal = ({ open, closeFormModal }) => {
  return (
    <Modal
      title={
        <Flex justify="space-between">
          <h3>System User</h3>
          <p>Required</p>
        </Flex>
      }
      open={open}
      onCancel={closeFormModal}
      width={600}
      extra="required"
      destroyOnClose
    >
      <Divider />
      <UserForm />
    </Modal>
  );
};
export default UserFormModal;
