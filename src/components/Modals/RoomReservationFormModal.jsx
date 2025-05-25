import { useEffect, useState } from "react";
import { Form, Modal, Steps, message } from "antd";
import {
  DollarCircleOutlined,
  GiftOutlined,
  HomeOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";

import CheckRoomForm from "../Forms/CheckRoomForm";
import RoomCheckInInfoForm from "../Forms/RoomCheckInInfoForm";
import RoomPaymentForm from "../Forms/RoomPaymentForm";
import RoomReservationExtraForm from "../Forms/RoomReservationExtraForm";

import { triggerFormFieldsValidation } from "../../utils/form";
import { calculateRoomReservationPrice } from "../../utils/pricing";

const RoomReservationFormModal = ({
  open,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
  additionalData,
  fetchRooms,
  amenities,
  roomPackages,
}) => {
  const [current, setCurrent] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingInformation, setPricingInformation] = useState({});
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // sets formdata based on form modal state
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      setFormData(selectedObject);
      setInitialFormData(selectedObject);
      form.setFieldsValue(selectedObject);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
      setFormData({});
      setInitialFormData({});
    }
  }, [open, isEditing, selectedObject, form]);

  // pricing calculation
  const checkPricing = () => {
    const roomId = form.getFieldValue("roomId").value;
    const dateRange = form.getFieldValue("reservationDateRange");
    const checkInDate = dateRange[0];
    const checkOutDate = dateRange[1];

    calculateRoomReservationPrice(
      roomId,
      checkInDate,
      checkOutDate,
      selectedAmenities,
      selectedPackage,
      setPricingLoading,
      setPricingInformation
    );
  };

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

  const onFinish = async () => {
    const values = form.getFieldsValue(true);
    const newData = { ...formData, ...values };
    setFormData(newData);

    // Prepare the data for submission
    const reservationData = {
      ...newData,
      childIds: newData?.childIds.map((c) => c.id),
      // Filter out the primary guest from the additional guests list
      guestIds: newData?.guestIds?.filter(
        (g) => g.id !== newData.primaryGuestId
      ),
      roomId: newData.roomId.value,
      reservedCheckInDate: newData.reservationDateRange[0].format("YYYY-MM-DD"),
      reservedCheckOutDate:
        newData.reservationDateRange[1].format("YYYY-MM-DD"),
      amenities: selectedAmenities.map((amenity) => ({
        amenityId: amenity.id,
        quantity: amenity.quantity,
      })),
      roomPackageId: selectedPackage,
      billingPayloadDTO: [
        {
          basePrice: Math.ceil(pricingInformation?.basePrice) || 0.0,
          totalTaxes: Math.ceil(pricingInformation?.totalTaxes) || 0.0,
          totalPrice: Math.ceil(pricingInformation?.totalPrice) || 0.0,
          discount: Math.ceil(pricingInformation?.discount) || 0.0,
          paidAmount: Math.ceil(newData.paidAmount),
          paymentMethodId: newData.paymentMethodId,
        },
      ],
    };

    delete reservationData.reservationDateRange;

    if (isEditing) {
      // Get the changed values and pass it into confirmation modal
      const updatedValues = getChangedFieldValues(
        initialFormData,
        reservationData
      );
      showUpdateConfirmModal(updatedValues, selectedObject.id, reservationData);
    } else {
      setConfirmLoading(true);
      await addItem(reservationData);
      form.resetFields();
      setFormData({});
      setConfirmLoading(false);
      closeFormModal();
    }
  };

  // After close modal operations
  const afterModalClose = () => {
    setCurrent(0);
    setFormData({});
    form.resetFields();
    setInitialFormData({});
    setSelectedAmenities([]);
    setSelectedPackage(null);
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
          setFormData={setFormData}
          formData={formData}
        />
      ),
      icon: <HomeOutlined />,
    },
    {
      title: "Check-In Info",
      content: (
        <RoomCheckInInfoForm
          form={form}
          isEditing={isEditing}
          setCurrent={setCurrent}
          additionalData={additionalData}
          next={next}
          prev={prev}
          setFormData={setFormData}
          formData={formData}
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
          checkPricing={checkPricing}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          formData={formData}
          setFormData={setFormData}
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
          additionalData={additionalData}
          formData={formData}
          setFormData={setFormData}
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
          initialValues={{ adultNo: 1, childNo: 0, infantNo: 0, paidAmount: 0 }}
        >
          <Steps
            type="navigation"
            size="small"
            current={current}
            items={steps}
            onChange={(clickedStep) => {
              // Prevent direct navigation from Package & Amenities to Checkout
              if (
                current === steps.length - 2 &&
                clickedStep === steps.length - 1
              ) {
                messageApi.warning(
                  "Please use the 'Proceed To Checkout' button to proceed"
                );
                return;
              }

              if (clickedStep > current) {
                next();
              } else if (clickedStep < current) {
                setCurrent(clickedStep);
                triggerFormFieldsValidation(form);
              }
            }}
          />
          <div style={{ marginTop: 16 }}>{steps[current].content}</div>
        </Form>
      </Modal>
    </>
  );
};

export default RoomReservationFormModal;
