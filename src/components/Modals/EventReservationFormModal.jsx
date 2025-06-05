import { useEffect, useState } from "react";
import { Form, Modal, Steps, message } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import EventBasicInfoForm from "../Forms/EventBasicInfoForm";
import EventGuestInfoForm from "../Forms/EventGuestInfoForm";
import EventServicesForm from "../Forms/EventServicesForm";
import EventPaymentForm from "../Forms/EventPaymentForm";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

const EventReservationFormModal = ({
  open,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
  additionalData,
}) => {
  const [current, setCurrent] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});
  const [selectedServices, setSelectedServices] = useState([]);

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // Set formdata based on form modal state
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      const updatedData = {
        ...selectedObject,
        dateRange:
          selectedObject.startDatetime && selectedObject.endDatetime
            ? [
                dayjs(selectedObject.startDatetime),
                dayjs(selectedObject.endDatetime),
              ]
            : null,
      };
      setFormData(updatedData);
      setInitialFormData(updatedData);
      form.setFieldsValue(updatedData);
      setSelectedServices(selectedObject.services || []);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
      setFormData({});
      setInitialFormData({});
      setSelectedServices([]);
    }
  }, [open, isEditing, selectedObject, form]);

  // Next button of the step form
  const next = async () => {
    try {
      const values = await form.validateFields();
      const newData = { ...formData, ...values };
      setFormData(newData);
      form.setFieldsValue(newData);
      setCurrent(current + 1);

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
    triggerFormFieldsValidation(form);
  };

  const onFinish = async () => {
    form.setFieldsValue({
      services: selectedServices,
    });

    const formdata = form.getFieldsValue();

    // Format and update formdata
    const updatedData = {
      ...formdata,
      startDatetime: formdata.dateRange
        ? formdata.dateRange[0].toISOString()
        : null,
      endDatetime: formdata.dateRange
        ? formdata.dateRange[1].toISOString()
        : null,
      reservationDatetime: dayjs().toISOString(),
    };

    // Remove the dateRange field as it's not needed in the payload
    delete updatedData.dateRange;

    if (isEditing) {
      const updatedValues = getChangedFieldValues(initialFormData, formdata, {
        module: "Event Reservation",
        services: additionalData.services,
      });
      showUpdateConfirmModal(updatedValues, selectedObject.id, updatedData);
    } else {
      setConfirmLoading(true);
      await addItem(updatedData);
      afterModalClose();
      setConfirmLoading(false);
      closeFormModal();
    }
  };

  // After close modal operations
  const afterModalClose = () => {
    setCurrent(0);
    setFormData({});
    setSelectedServices([]);
    form.resetFields();
    setInitialFormData({});
  };

  // Steps of the step form
  const steps = [
    {
      title: "Basic Info",
      content: (
        <EventBasicInfoForm
          form={form}
          isEditing={isEditing}
          setCurrent={setCurrent}
          next={next}
          setFormData={setFormData}
          formData={formData}
          additionalData={additionalData}
        />
      ),
      icon: <CalendarOutlined />,
    },
    {
      title: "Guest Info",
      content: (
        <EventGuestInfoForm
          form={form}
          isEditing={isEditing}
          setCurrent={setCurrent}
          next={next}
          prev={prev}
          setFormData={setFormData}
          formData={formData}
          additionalData={additionalData}
        />
      ),
      icon: <UserOutlined />,
    },
    {
      title: "Services",
      content: (
        <EventServicesForm
          form={form}
          isEditing={isEditing}
          setCurrent={setCurrent}
          next={next}
          prev={prev}
          setFormData={setFormData}
          formData={formData}
          additionalData={additionalData}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />
      ),
      icon: <SettingOutlined />,
    },
    {
      title: "Review & Submit",
      content: (
        <EventPaymentForm
          form={form}
          isEditing={isEditing}
          setCurrent={setCurrent}
          confirmLoading={confirmLoading}
          prev={prev}
          formData={formData}
          setFormData={setFormData}
          additionalData={additionalData}
          selectedServices={selectedServices}
        />
      ),
      icon: <DollarCircleOutlined />,
    },
  ];

  return (
    <>
      {contextHolder}
      <Modal
        title={`${!isEditing ? "Add New" : "Update"} Event Reservation`}
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
          initialValues={{ expectedGuestCount: 1 }}
        >
          <Steps
            type="navigation"
            size="small"
            current={current}
            items={steps}
            onChange={(clickedStep) => {
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

export default EventReservationFormModal;
