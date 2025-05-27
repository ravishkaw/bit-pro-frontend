import { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row, Select, DatePicker } from "antd";
import dayjs from "dayjs";

import FormOnFinishButtons from "./FormOnFinishButtons";
import FormInputTooltip from "./FormInputTooltip";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";
import { formValidations } from "./validations";

const TaskForm = ({
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
  const [targetType, setTargetType] = useState("Room");
  const [form] = Form.useForm();

  const {
    taskTypes,
    taskStatus,
    employees,
    taskTargetTypes,
    rooms,
    eventVenues,
  } = additionalData;

  const {
    noteValidation,
    scheduledDateValidation,
    dateValidation,
    actualDateValidation,
  } = formValidations;

  // Set initial values when editing
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      const updatedData = {
        ...selectedObject,
        // Convert date strings to dayjs objects for DatePicker
        scheduledStartTime: selectedObject?.scheduledStartTime
          ? dayjs(selectedObject.scheduledStartTime)
          : null,
        scheduledEndTime: selectedObject?.scheduledEndTime
          ? dayjs(selectedObject.scheduledEndTime)
          : null,
        actualStartTime: selectedObject?.actualStartTime
          ? dayjs(selectedObject.actualStartTime)
          : null,
        actualEndTime: selectedObject?.actualEndTime
          ? dayjs(selectedObject.actualEndTime)
          : null,
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
      // Convert dayjs objects to local datetime strings for backend
      scheduledStartTime: formdata?.scheduledStartTime?.format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
      scheduledEndTime: formdata?.scheduledEndTime?.format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
      actualStartTime: formdata?.actualStartTime?.format("YYYY-MM-DDTHH:mm:ss"),
      actualEndTime: formdata?.actualEndTime?.format("YYYY-MM-DDTHH:mm:ss"),
      taskInventories: [],
      taskCosts: [],
    };

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formdata, {
        module,
        taskTypes,
        taskStatus,
        employees,
        rooms,
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
      title={`${!isEditing ? "Add New" : "Update"} ${module}`}
      open={open}
      width={800}
      onCancel={closeFormModal}
      footer={null}
      destroyOnClose
      afterClose={() => form.resetFields()}
    >
      <Form form={form} layout="vertical" labelWrap onFinish={onFinish}>
        <Row gutter={16}>
          <Col sm={12} md={8} xs={24}>
            <Form.Item
              name="taskTypeId"
              label={
                <FormInputTooltip
                  label="Task Type"
                  title="Select the type of task"
                />
              }
              rules={[
                { required: true, message: "Please select the task type" },
              ]}
              hasFeedback
            >
              <Select
                placeholder="Select Task Type"
                options={taskTypes}
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>

          <Col sm={12} md={8} xs={24}>
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
          </Col>

          <Col sm={12} md={8} xs={24}>
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
          </Col>
        </Row>

        <Row gutter={16}>
          <Col sm={12} md={8} xs={24}>
            <Form.Item
              name="assignedToId"
              label={
                <FormInputTooltip
                  label="Assigned To"
                  title="Select the employee assigned to this task"
                />
              }
              rules={[
                {
                  required: true,
                  message: "Please select a employee to do the task",
                },
              ]}
              hasFeedback
            >
              <Select
                placeholder="Select employee"
                options={employees}
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>
          <Col sm={12} md={8} xs={24}>
            <Form.Item
              name="scheduledStartTime"
              label={
                <FormInputTooltip
                  label="Scheduled Start Time"
                  title="When the task is scheduled to begin"
                />
              }
              rules={[
                ...(!isEditing ? dateValidation : []),
                { required: true, message: "Please select a start time" },
              ]}
              hasFeedback
            >
              <DatePicker
                showTime
                format={dateFormat}
                placeholder="Select start time"
                style={{ width: "100%" }}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>

          <Col sm={12} md={8} xs={24}>
            <Form.Item
              name="scheduledEndTime"
              label={
                <FormInputTooltip
                  label="Scheduled End Time"
                  title="When the task is scheduled to end"
                />
              }
              rules={[
                ...(!isEditing ? dateValidation : []),
                ...scheduledDateValidation,
                { required: true, message: "Please select an end time" },
              ]}
              dependencies={["scheduledStartTime"]}
              hasFeedback
            >
              <DatePicker
                showTime
                format={dateFormat}
                placeholder="Select end time"
                style={{ width: "100%" }}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col sm={12} md={8} xs={24}>
            <Form.Item
              name="actualStartTime"
              label={
                <FormInputTooltip
                  label="Actual Start Time"
                  title="When the task actually started"
                />
              }
              rules={[...(!isEditing ? dateValidation : [])]}
              hasFeedback
            >
              <DatePicker
                showTime
                format={dateFormat}
                placeholder="Select actual start time"
                style={{ width: "100%" }}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>

          <Col sm={12} md={8} xs={24}>
            <Form.Item
              name="actualEndTime"
              label={
                <FormInputTooltip
                  label="Actual End Time"
                  title="When the task actually ended"
                />
              }
              dependencies={["actualStartTime"]}
              hasFeedback
              rules={[
                ...(!isEditing ? dateValidation : []),
                ...actualDateValidation,
              ]}
            >
              <DatePicker
                showTime
                format={dateFormat}
                placeholder="Select actual end time"
                style={{ width: "100%" }}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>

          <Col sm={8} xs={24}>
            <Form.Item
              name="taskStatusId"
              label={
                <FormInputTooltip
                  label="Task Status"
                  title="Select the status of the task"
                />
              }
              hasFeedback
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select
                placeholder="Select Status"
                options={taskStatus}
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label={
                <FormInputTooltip
                  label="Description"
                  title="Provide details about the room's features or amenities"
                />
              }
              rules={[
                ...noteValidation,
                { required: true, message: "Please enter short description" },
              ]}
              hasFeedback
            >
              <Input.TextArea placeholder="E.g., Cleaning" rows={1} />
            </Form.Item>
          </Col>
        </Row>

        <FormOnFinishButtons
          closeFormModal={closeFormModal}
          isEditing={isEditing}
          confirmLoading={confirmLoading}
        />
      </Form>
    </Modal>
  );
};

export default TaskForm;
