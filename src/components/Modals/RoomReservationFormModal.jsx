import { useEffect, useState } from "react";
import { Button, Flex, Form, Modal, Space, Steps, message } from "antd";
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
import RoomCheckInInfoForm from "../Forms/RoomCheckInInfoForm";
import RoomPaymentForm from "../Forms/RoomPaymentForm";
import RoomReservationExtraForm from "../Forms/RoomReservationExtraForm";
import { triggerFormFieldsValidation } from "../../utils/form";

const RoomReservationFormModal = ({
  open,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
  additionalData,
  fetchRooms,
  guestHookData,
  amenities,
  roomPackages,
  checkRoomReservationPricing,
}) => {
  const [current, setCurrent] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingInformation, setPricingInformation] = useState({});

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { reservationTypes, reservationSources } = additionalData;

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
      messageApi.error("Please fill all the required fields");
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
      content: (
        <CheckRoomForm
          form={form}
          fetchRooms={fetchRooms}
          isEditing={isEditing}
          setCurrent={setCurrent}
          next={next}
        />
      ),
      icon: <HomeOutlined />,
    },
    {
      title: "Check-In Info",
      content: (
        <RoomCheckInInfoForm
          form={form}
          guestHookData={guestHookData}
          reservationTypes={reservationTypes}
          reservationSources={reservationSources}
          isEditing={isEditing}
          setCurrent={setCurrent}
          next={next}
          prev={prev}
        />
      ),
      icon: <ScheduleOutlined />,
    },
    {
      title: "Package & Amenities",
      content: (
        <RoomReservationExtraForm
          form={form}
          roomPackages={roomPackages}
          amenities={amenities}
          isEditing={isEditing}
          setCurrent={setCurrent}
          next={next}
          prev={prev}
          checkRoomReservationPricing={checkRoomReservationPricing}
          setPricingLoading={setPricingLoading}
          setPricingInformation={setPricingInformation}
        />
      ),
      icon: <GiftOutlined />,
    },
    {
      title: "Checkout",
      content: (
        <RoomPaymentForm
          form={form}
          isEditing={isEditing}
          setCurrent={setCurrent}
          confirmLoading={confirmLoading}
          prev={prev}
          pricingLoading={pricingLoading}
          pricingInformation={pricingInformation}
        />
      ),
      icon: <DollarCircleOutlined />,
    },
  ];

  return (
    <>
      {contextHolder}
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
          <Steps
            type="navigation"
            size="small"
            current={current}
            items={steps}
          />
          <div style={{ marginTop: 16 }}>{steps[current].content}</div>
        </Form>
      </Modal>
    </>
  );
};

export default RoomReservationFormModal;
