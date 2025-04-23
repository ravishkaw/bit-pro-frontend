import { useEffect, useState } from "react";
import { DatePicker, Form, Input, InputNumber, Switch, Modal } from "antd";

import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";
import { formValidations } from "./validations";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

const { RangePicker } = DatePicker;

// Form of room pricing rule add/ edit
const RoomPricingRuleForm = ({
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

  const { noteValidation } = formValidations;

  // Handle edit populate the wanted fields
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      const updatedFormData = {
        ...selectedObject,
        dateRange: [selectedObject?.startDate, selectedObject?.endDate], // format to range picker
        statusName: selectedObject?.statusName == "Active" ? true : false,
      };

      form.setFieldsValue(updatedFormData);
      setInitialFormData(updatedFormData);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
    }
  }, [isEditing, selectedObject, form]);

  const onFinish = async () => {
    const formdata = form.getFieldsValue();

    // Format and update formdata
    const updatedData = {
      ...formdata,
      startDate: formdata.dateRange[0].format("YYYY-MM-DD"),
      endDate: formdata.dateRange[1].format("YYYY-MM-DD"),
      statusName: formdata.statusName ? "Active" : "Inactive",
    };

    delete updatedData.dateRange; // delete date range from updatedData object

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formdata);
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
        labelWrap
        onFinish={onFinish}
      >
        <Form.Item
          name="description"
          label={
            <FormInputTooltip
              label="Description"
              title="Brief explanation of this pricing rule"
            />
          }
          rules={[
            ...noteValidation,
            { required: true, message: "Please enter a description" },
            { min: 3, message: "Please enter at least 3 characters " },
          ]}
          hasFeedback
        >
          <Input.TextArea placeholder="E.g., Weekend rate, Summer season, Holiday pricing" />
        </Form.Item>

        <Form.Item
          name="dateRange"
          label={
            <FormInputTooltip
              label="Date Range"
              title="Set the period when this pricing rule will be in effect"
            />
          }
          hasFeedback
          rules={[{ required: true, message: "Select date range" }]}
        >
          <RangePicker
            style={{ width: "100%" }}
            placeholder={["Start Date", "End Date"]}
            placement="bottomRight"
          />
        </Form.Item>

        <Form.Item
          name="pricingMultiplier"
          label={
            <FormInputTooltip
              label="Pricing Multiplier"
              title="Factor to multiply the base room price"
            />
          }
          rules={[{ required: true, message: "Enter pricing multiplier" }]}
          hasFeedback
        >
          <InputNumber
            addonBefore="x"
            placeholder="1.50"
            step="0.01"
            min="0.01"
            precision={2}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="statusName"
          label={
            <FormInputTooltip
              label="Status"
              title="Toggle to activate or deactivate pricing rule"
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

export default RoomPricingRuleForm;
