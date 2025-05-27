import { useEffect, useState } from "react";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
} from "antd";

import FormOnFinishButtons from "./FormOnFinishButtons";
import FormInputTooltip from "./FormInputTooltip";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";
import { formValidations } from "./validations";
import { mapToSelectOptions } from "../../utils/utils";

const PreventiveMaintenanceForm = ({
  additionalData,
  open,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
}) => {
  const [initialFormData, setInitialFormData] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [targetType, setTargetType] = useState("Room");

  const { maintenanceStatus, rooms, eventVenues, taskTargetTypes } =
    additionalData;
  const {
    alphanumericWithSpacesValidation,
    dateValidation,
    actualDateValidation,
  } = formValidations;

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

  const onFinish = async () => {
    const formdata = form.getFieldsValue();

    // Format and update formdata
    const updatedData = {
      ...formdata,
      scheduledDate: formdata?.scheduledDate?.format("YYYY-MM-DDTHH:mm:ss"),
      completedDate: formdata?.completedDate?.format("YYYY-MM-DDTHH:mm:ss"),
    };

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formdata, {
        maintenanceStatus,
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

  const dateFormat = "YYYY-MM-DD HH:mm";
  // Disable past dates in the date picker
  const disabledDate = (current) => {
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <Modal
      title={`${!isEditing ? "Add New" : "Update"} Maintenance Record`}
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
          name="targetTypeId"
          label={
            <FormInputTooltip
              label="Task Target Type"
              title="Select event venue or room for this task"
            />
          }
          rules={[
            {
              required: true,
              message: "Please select the task target type",
            },
          ]}
          hasFeedback
        >
          <Select
            placeholder="Select Task Target Type"
            options={taskTargetTypes}
            showSearch
            optionFilterProp="label"
            onChange={(value, option) => {
              form.setFieldsValue({ targetId: undefined });
              setTargetType(option.label);
            }}
          />
        </Form.Item>

        <Form.Item
          name="targetId"
          label={
            <FormInputTooltip
              label={targetType == "Room" ? "Room" : "Event Venue"}
              title="Select the target for this task"
            />
          }
          rules={[{ required: true, message: "Please select target" }]}
          hasFeedback
        >
          <Select
            placeholder="Select Target"
            options={targetType == "Room" ? rooms : eventVenues}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          name="maintenanceType"
          label={
            <FormInputTooltip
              label="Maintenance Type"
              title="Briefly describe the type of maintenance"
            />
          }
          rules={[
            ...alphanumericWithSpacesValidation,
            { required: true, message: "Please enter type of maintenance" },
          ]}
          hasFeedback
        >
          <Input placeholder="E.g., Electrical, Plumbing, etc." />
        </Form.Item>

        <Form.Item
          name="scheduledDate"
          label={
            <FormInputTooltip
              label="Scheduled Date"
              title="Select the scheduled date for the maintenance task"
            />
          }
          hasFeedback
          rules={[
            ...(!isEditing ? dateValidation : []),
            { required: true, message: "Please select a scheduled date" },
          ]}
        >
          <DatePicker
            showTime
            format={dateFormat}
            placeholder="Select Scheduled Date"
            style={{ width: "100%" }}
            disabledDate={disabledDate}
          />
        </Form.Item>

        <Form.Item
          name="completedDate"
          label={
            <FormInputTooltip
              label="Completed Date"
              title="Select the completed date for the maintenance task"
            />
          }
          hasFeedback
          rules={[
            ...(!isEditing ? dateValidation : []),
            ...actualDateValidation,
          ]}
        >
          <DatePicker
            showTime
            format={dateFormat}
            placeholder="Select Completed Date"
            style={{ width: "100%" }}
            disabledDate={disabledDate}
          />
        </Form.Item>

        <Form.Item
          name="maintenanceStatusId"
          label={
            <FormInputTooltip
              label="Maintenance Status"
              title="Select the status of the maintenance task"
            />
          }
          hasFeedback
          required
        >
          <Select
            placeholder="Select Maintenance Status"
            options={maintenanceStatus}
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

export default PreventiveMaintenanceForm;
