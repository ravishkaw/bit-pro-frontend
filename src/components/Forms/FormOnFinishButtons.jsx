import { Flex, Space, Button } from "antd";

// On finish button - edit / add
const FormOnFinishButtons = ({ closeFormModal, isEditing, confirmLoading }) => {
  return (
    <Flex justify="end">
      <Space>
        {/* <Button onClick={closeFormModal}>Cancel</Button> */}
        <Button
          type="primary"
          htmlType="submit"
          loading={!isEditing && confirmLoading}
        >
          {isEditing ? "Update" : "Add"}
        </Button>
      </Space>
    </Flex>
  );
};

export default FormOnFinishButtons;
