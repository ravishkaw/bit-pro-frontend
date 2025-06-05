import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Button,
  Space,
  Flex,
  Alert,
} from "antd";
import FormInputTooltip from "./FormInputTooltip";
import { formValidations } from "./validations";

const { RangePicker } = DatePicker;

const EventBasicInfoForm = ({
  form,
  isEditing,
  setCurrent,
  next,
  setFormData,
  formData,
}) => {
  const [error, setError] = useState(null);
  const { alphanumericWithSpacesValidation } = formValidations;

  // Handle next button click
  const handleNext = () => {
    const dateRange = form.getFieldValue("dateRange");
    const eventName = form.getFieldValue("name");
    const expectedGuestCount = form.getFieldValue("expectedGuestCount");

    if (!dateRange || !eventName || !expectedGuestCount) {
      setError("Please fill all required fields");
      return;
    }
    setError(null);
    next();
  };

  // Handle reset button click
  const handleReset = () => {
    form.resetFields();
    setCurrent(0);
    setError(null);
    setFormData({});
  };

  return (
    <>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Row gutter={16}>
        <Col span={18}>
          <Form.Item
            name="dateRange"
            label={
              <FormInputTooltip
                label="Event Date & Time"
                title="Select the start and end date/time for the event"
              />
            }
            rules={[
              { required: true, message: "Please select event date range" },
            ]}
            hasFeedback
          >
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder={["Start Date & Time", "End Date & Time"]}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="expectedGuestCount"
            label={
              <FormInputTooltip
                label="Expected Guest Count"
                title="Enter the expected number of guests"
              />
            }
            rules={[
              {
                required: true,
                message: "Please enter expected guest count",
              },
            ]}
            hasFeedback
          >
            <InputNumber
              placeholder="Number of guests"
              min={1}
              max={1000}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label={
              <FormInputTooltip
                label="Event Name"
                title="Enter the name of the event"
              />
            }
            rules={[
              ...alphanumericWithSpacesValidation,
              { required: true, message: "Please enter event name" },
            ]}
            hasFeedback
          >
            <Input placeholder="E.g., Birthday Party, Wedding Reception" />
          </Form.Item>
        </Col>
      </Row>

      <Flex
        justify={isEditing ? "end" : "space-between"}
        style={{ marginTop: 16 }}
      >
        {!isEditing && (
          <Button color="default" variant="dashed" onClick={handleReset}>
            Reset
          </Button>
        )}
        <Space>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </Space>
      </Flex>
    </>
  );
};

export default EventBasicInfoForm;
