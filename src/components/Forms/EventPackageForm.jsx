import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Typography,
  Switch,
} from "antd";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";
import { useThemeContext } from "../../contexts/ThemeContext";
import { formValidations } from "./validations";

const { Text } = Typography;

const EventPackageForm = ({
  additionalData,
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
}) => {
  const [initialFormData, setInitialFormData] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [form] = Form.useForm();

  const { isDarkMode } = useThemeContext();
  const { eventServices } = additionalData;
  const { alphanumericWithSpacesValidation, noteValidation } = formValidations;

  // Set initial values when editing
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      const updatedData = {
        ...selectedObject,
        statusName: selectedObject?.statusName == "Active" ? true : false,
      };
      form.setFieldsValue(updatedData);
      setInitialFormData(updatedData);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedObject, form]);

  useEffect(() => {
    if (open && isEditing && selectedObject && selectedObject.eventServices) {
      setSelectedServices(selectedObject.eventServices);
    } else if (open && !isEditing) {
      setSelectedServices([]);
    }
  }, [open, isEditing, selectedObject]);

  // Handle service quantity change
  const handleServicesQuantityChange = (eventServiceId, newQty) => {
    const newQuantity = Math.max(0, newQty || 0);

    setSelectedServices((prevServices) => {
      // If quantity is 0, remove from selection
      if (newQuantity === 0) {
        return prevServices.filter(
          (service) => service.eventServiceId !== eventServiceId
        );
      }

      // If already selected, update quantity
      const existingIndex = prevServices.findIndex(
        (service) => service.eventServiceId === eventServiceId
      );
      if (existingIndex >= 0) {
        const updatedServices = [...prevServices];
        updatedServices[existingIndex] = {
          ...updatedServices[existingIndex],
          quantity: newQuantity,
        };
        return updatedServices;
      }

      // Add new selection
      return [
        ...prevServices,
        { eventServiceId: eventServiceId, quantity: newQuantity },
      ];
    });
  };

  const onFinish = async () => {
    form.setFieldsValue({
      eventServices: selectedServices,
    });

    const formdata = form.getFieldsValue();

    // Format and update formdata
    const updatedData = {
      ...formdata,
      statusName: formdata.statusName ? "Active" : "Inactive",
    };

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formdata, {
        module,
        eventServices,
      });
      showUpdateConfirmModal(updatedValues, selectedObject.id, updatedData);
    } else {
      setConfirmLoading(true);
      await addItem(updatedData);
      form.resetFields();
      setConfirmLoading(false);
      closeFormModal();
    }
  };

  return (
    <Modal
      title={`${!isEditing ? "Add New" : "Update"} ${module}`}
      open={open}
      width={600}
      onCancel={closeFormModal}
      footer={null}
      destroyOnClose
      afterClose={() => form.resetFields()}
    >
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
        onFinish={onFinish}
        initialValues={{ usedQuantity: 0 }}
      >
        <Form.Item
          name="name"
          label={
            <FormInputTooltip
              label="Package Name"
              title="Enter the name of the package"
            />
          }
          rules={[
            ...alphanumericWithSpacesValidation,
            { required: true, message: "Please enter package name" },
          ]}
          hasFeedback
        >
          <Input placeholder="E.g., Full Board, Half Board" />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <FormInputTooltip
              label="Description"
              title="Enter the description of the package"
            />
          }
          rules={[
            ...noteValidation,
            { required: true, message: "Please enter description" },
          ]}
          hasFeedback
        >
          <Input.TextArea placeholder="E.g., Package with room and lunch" />
        </Form.Item>

        <Form.Item label="Add Optional Services">
          <div
            style={{
              border: `1px solid ${isDarkMode ? "#464963" : "#e5e6e8"}`,
              padding: "0 16px",
              borderRadius: 8,
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={eventServices}
              renderItem={(service) => {
                const selectedService = selectedServices.find(
                  (a) => a.eventServiceId === service.id
                );
                const quantity = selectedService ? selectedService.quantity : 0;

                return (
                  <List.Item key={service.id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div style={{ flex: 2 }}>
                        <Text>{service.name}</Text>
                      </div>

                      <div
                        style={{
                          flex: 2,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          type="default"
                          size="small"
                          onClick={() =>
                            handleServicesQuantityChange(
                              service.id,
                              quantity - 1
                            )
                          }
                          disabled={quantity <= 0}
                        >
                          -
                        </Button>
                        <InputNumber
                          size="small"
                          min={0}
                          value={quantity}
                          onChange={(value) =>
                            handleServicesQuantityChange(service.id, value)
                          }
                          style={{
                            margin: "0 4px",
                            textAlign: "center",
                          }}
                        />
                        <Button
                          type="default"
                          size="small"
                          onClick={() =>
                            handleServicesQuantityChange(
                              service.id,
                              quantity + 1
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </List.Item>
                );
              }}
            />
          </div>
        </Form.Item>

        <Form.Item name="eventServices" noStyle hidden>
          <Input hidden />
        </Form.Item>

        <Form.Item
          name="statusName"
          label={
            <FormInputTooltip
              label="Status"
              title="Set the status of the package"
            />
          }
          hasFeedback
          required
        >
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            defaultChecked={false}
          />
        </Form.Item>

        <FormOnFinishButtons
          closeFormModal={closeFormModal}
          isEditing={isEditing}
          confirmLoading={confirmLoading}
        />
      </Form>
    </Modal>
  );
};

export default EventPackageForm;
