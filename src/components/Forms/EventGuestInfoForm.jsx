import { useState } from "react";
import { Form, Select, Row, Col, Button, Space, Flex, Alert } from "antd";
import FormInputTooltip from "./FormInputTooltip";

const EventGuestInfoForm = ({
  form,
  isEditing,
  setCurrent,
  next,
  prev,
  setFormData,
  formData,
  additionalData,
}) => {
  const [error, setError] = useState(null);
  const { guests, eventTypes, eventVenues, eventStatus, eventPackages } =
    additionalData;

  // Handle next button click
  const handleNext = () => {
    const guestId = form.getFieldValue("guestId");
    const eventTypeId = form.getFieldValue("eventTypeId");
    const eventVenueId = form.getFieldValue("eventVenueId");
    const eventStatusId = form.getFieldValue("eventStatusId");

    if (!guestId || !eventTypeId || !eventVenueId || !eventStatusId) {
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
        <Col span={24}>
          <Form.Item
            name="guestId"
            label={
              <FormInputTooltip
                label="Guest"
                title="Select the guest for this event reservation"
              />
            }
            rules={[{ required: true, message: "Please select a guest" }]}
            hasFeedback
          >
            <Select
              placeholder="Select a guest"
              options={guests.map((guest) => ({
                label: `${guest.fullName} (${guest.email})`,
                value: guest.id,
              }))}
              optionFilterProp="label"
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="eventTypeId"
            label={
              <FormInputTooltip
                label="Event Type"
                title="Select the type of event"
              />
            }
            rules={[{ required: true, message: "Please select event type" }]}
            hasFeedback
          >
            <Select
              placeholder="Select event type"
              options={eventTypes}
              optionFilterProp="label"
              showSearch
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="eventVenueId"
            label={
              <FormInputTooltip
                label="Event Venue"
                title="Select the venue for the event"
              />
            }
            rules={[{ required: true, message: "Please select event venue" }]}
            hasFeedback
          >
            <Select
              placeholder="Select event venue"
              options={eventVenues}
              optionFilterProp="label"
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="eventStatusId"
            label={
              <FormInputTooltip
                label="Event Status"
                title="Select the status of the event"
              />
            }
            rules={[{ required: true, message: "Please select event status" }]}
            hasFeedback
          >
            <Select
              placeholder="Select event status"
              options={eventStatus}
              optionFilterProp="label"
              showSearch
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="eventPackageId"
            label={
              <FormInputTooltip
                label="Event Package"
                title="Select an event package (optional)"
              />
            }
            hasFeedback
          >
            <Select
              placeholder="Select event package (optional)"
              allowClear
              options={eventPackages}
              optionFilterProp="label"
              showSearch
            />
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
          <Button onClick={prev}>Previous</Button>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </Space>
      </Flex>
    </>
  );
};

export default EventGuestInfoForm;
