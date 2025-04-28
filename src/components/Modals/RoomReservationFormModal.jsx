import { useEffect, useState } from "react";
import { Button, Flex, Form, Modal, Space, Steps } from "antd";
import {
  ContactsOutlined,
  DollarCircleOutlined,
  GiftOutlined,
  HomeOutlined,
  IdcardOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CheckRoomForm from "../Forms/CheckRoomForm";
import RoomCheckInGuestForm from "../Forms/RoomCheckInGuestForm";
import RoomPaymentForm from "../Forms/RoomPaymentForm";
import { Children } from "react";
import RoomReservationExtraForm from "../Forms/RoomReservationExtraForm";

const RoomReservationFormModal = ({
  additionalData,
  open,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
}) => {
  const [current, setCurrent] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});
  const [form] = Form.useForm();

  // Next button of the step form
  const next = async () => {
    try {
      const values = await form.validateFields(); // validate values before goes to next step
      const newData = { ...formData, ...values };
      setFormData(newData);
      form.setFieldsValue(newData);
      setCurrent(current + 1);

      // trigger form validation in edit mode
      if (isEditing) {
        triggerFormFieldsValidation(form);
      }
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  // Previous button of the step form
  const prev = () => {
    setCurrent(current - 1);
    triggerFormFieldsValidation(form); // trigger validation
  };

  const onFinish = () => {};

  // After close modal operations
  const afterModalClose = () => {
    setCurrent(0);
    setFormData({});
    form.resetFields();
    setInitialFormData({});
  };

  // Steps of the step form
  const steps = [
    {
      title: "Check Room",
      content: <CheckRoomForm />,
      icon: <HomeOutlined />,
    },
    {
      title: "Guest Details",
      content: <RoomCheckInGuestForm />,
      icon: <ScheduleOutlined />,
    },
    {
      title: "Package & Amenities",
      content: <RoomReservationExtraForm />,
      icon: <GiftOutlined />,
    },
    {
      title: "Checkout",
      content: <RoomPaymentForm />,
      icon: <DollarCircleOutlined />,
    },
  ];

  return (
    <Modal
      title={`${!isEditing ? "Add New" : "Update"} Room Reservation`}
      open={open}
      width={900}
      footer={null}
      maskClosable={false}
      onCancel={closeFormModal}
      afterClose={afterModalClose}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        labelWrap
        onFinish={onFinish}
        initialValues={{ adults: 1, children: 0, infants: 0 }}
      >
        <Steps type="navigation" size="small" current={current} items={steps} />
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          {steps[current].content}
        </div>

        <Flex justify={isEditing ? "end" : "space-between"}>
          {!isEditing && (
            <Button
              color="default"
              variant="dashed"
              onClick={() => {
                form.resetFields();
                setCurrent(0);
              }}
            >
              Reset
            </Button>
          )}
          <Space>
            {/* {current === 0 && <Button onClick={closeFormModal}>Cancel</Button>} */}
            {current > 0 && <Button onClick={prev}>Previous</Button>}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                {current === steps.length - 2 ? "Proceed To Checkout" : "Next"}
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                color={isEditing ? "primary" : "green"}
                variant="solid"
                htmlType="submit"
                loading={confirmLoading}
              >
                {isEditing ? "Update" : "Submit"}
              </Button>
            )}
          </Space>
        </Flex>
      </Form>
    </Modal>
  );
};

export default RoomReservationFormModal;
