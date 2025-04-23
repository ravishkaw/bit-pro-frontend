import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
} from "antd";
import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";
import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";

const RoomPackageForm = ({
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
  const [form] = Form.useForm();

  // Set initial values when editing
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      form.setFieldsValue(selectedObject);
      setInitialFormData(selectedObject);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedObject, form]);

  const onFinish = async () => {
    const formData = form.getFieldsValue();

    const updatedData = {
      ...formData,
      usedQuantity: isEditing ? formData.usedQuantity : 0,
    };

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(
        initialFormData,
        updatedData,
        { module }
      );
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
          name="itemTypeId"
          label={
            <FormInputTooltip
              label="Room"
              title="Select the category of the item"
            />
          }
          rules={[
            { required: true, message: "Please select the item category" },
          ]}
          hasFeedback
        >
          <Select
            placeholder="Select item category"
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          name="itemName"
          label={
            <FormInputTooltip
              label="Item Name"
              title="Enter the name of the item"
            />
          }
          rules={[{ required: true, message: "Please enter item name" }]}
          hasFeedback
        >
          <Input placeholder="E.g., Kettle, Broom" />
        </Form.Item>

        <Form.Item
          name="quantity"
          label={
            <FormInputTooltip
              label="Quantity"
              title="Full quantity of the item"
            />
          }
          rules={[{ required: true, message: "Please Enter the quantity" }]}
          hasFeedback
        >
          <InputNumber
            placeholder="E.g., 200"
            style={{ width: "100%" }}
            min="0"
            max="100000"
            step="1"
            keyboard
          />
        </Form.Item>

        {isEditing && (
          <Form.Item
            name="usedQuantity"
            label={
              <FormInputTooltip
                label="Used Quantity"
                title="Used quantity of the item"
              />
            }
            rules={[{ required: true, message: "Please select the quantity" }]}
            hasFeedback
          >
            <InputNumber
              placeholder="E.g., 200"
              style={{ width: "100%" }}
              min="0"
              max="100000"
              step="1"
              keyboard
            />
          </Form.Item>
        )}

        <Form.Item
          name="lastRestockedDate"
          label={
            <FormInputTooltip
              label="Last Restocked Date"
              title="Last Restocked Date of the item"
            />
          }
          rules={[{ required: true, message: "Please select the date" }]}
          hasFeedback
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="statusId"
          label={
            <FormInputTooltip label="Item Status" title="Status of the Item" />
          }
          rules={[{ required: true, message: "Please select status" }]}
          hasFeedback
        >
          <Select
            placeholder="Select item category"
            showSearch
            optionFilterProp="label"
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

export default RoomPackageForm;
