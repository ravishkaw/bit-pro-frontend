import { useEffect, useState } from "react";
import { DatePicker, Form, Input, InputNumber, Select, Switch } from "antd";

import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";
import { formValidations } from "./validations";
import { mapToSelectOptions } from "../../utils/utils";
import { triggerFormFieldsValidation } from "../../utils/form";

const { RangePicker } = DatePicker;

// Form of room pricing rule add/ edit
const RoomPricingRuleForm = ({
  roomTypes,
  closeFormModal,
  isEditing,
  selectedObject,
  addPricingRule,
  updatePricingRule,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { noteValidation } = formValidations;

  // Handle edit populate the wanted fields
  useEffect(() => {
    if (isEditing && selectedObject) {
      form.setFieldsValue({
        ...selectedObject,
        roomType: mapToSelectOptions([selectedObject?.roomType]), // map to the select tag
        dateRange: [selectedObject?.startDate, selectedObject?.endDate], // format to range picker
        status: !selectedObject?.isDeleted, // "!" because isDeleted = 0 for true. Active to 1
      });
      triggerFormFieldsValidation(form);
    } else {
      form.resetFields();
    }
  }, [isEditing, selectedObject, form]);

  const onFinish = async () => {
    const data = form.getFieldsValue();

    // Format and update data
    const updatedData = {
      ...data,
      startDate: data.dateRange[0],
      endDate: data.dateRange[1],
      roomType: {
        id: isEditing ? data.roomType[0].value : data.roomType, // format roomtype to relevant format
      },
      isDeleted: !data.status,
    };

    delete updatedData.dateRange; // delete date range from updatedData object

    setConfirmLoading(true);
    try {
      if (isEditing) {
        await updatePricingRule(selectedObject.id, updatedData);
      } else {
        await addPricingRule(updatedData);
        form.resetFields();
      }
    } finally {
      setConfirmLoading(false);
      closeFormModal();
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
      labelWrap
      onFinish={onFinish}
    >
      <Form.Item
        name="roomType"
        label={
          <FormInputTooltip label="Room Type" title="Select a room type" />
        }
        rules={[{ required: true, message: "Select a room type" }]}
        hasFeedback
      >
        <Select
          showSearch
          placeholder="Select Room Type"
          options={roomTypes}
          disabled={isEditing}
        />
      </Form.Item>

      <Form.Item
        name="dateRange"
        label={<FormInputTooltip label="Date Range" title="Enter date range" />}
        hasFeedback
        rules={[{ required: true, message: "Select date range" }]}
      >
        <RangePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="description"
        label={
          <FormInputTooltip
            label="Description"
            title="Short description of the rule"
          />
        }
        rules={[
          ...noteValidation,
          { required: true, message: "Please enter a description" },
          { min: 3, message: "Please enter at least 3 characters " },
        ]}
        hasFeedback
      >
        <Input.TextArea placeholder="short description" />
      </Form.Item>

      <Form.Item
        name="pricingMultiplier"
        label={
          <FormInputTooltip
            label="Pricing Multiplier"
            title="pricing multiplier of the rule"
          />
        }
        rules={[
          { required: true, message: "Enter pricing multiplier" },
        ]}
        hasFeedback
      >
        <InputNumber
          addonAfter="x"
          placeholder="E.g., 1.5, 2.0, 2.5"
          step="0.1"
          min="0.1"
          precision={1}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        name="status"
        label={
          <FormInputTooltip
            label="Status"
            title="Set status as active or inactive"
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
  );
};

export default RoomPricingRuleForm;
