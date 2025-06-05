import {
  Form,
  Button,
  Card,
  Typography,
  Space,
  Flex,
  Descriptions,
  Divider,
} from "antd";
import FormOnFinishButtons from "./FormOnFinishButtons";

const { Title, Text } = Typography;

const EventPaymentForm = ({
  form,
  isEditing,
  confirmLoading,
  prev,
  formData,
  additionalData,
  selectedServices,
}) => {
  const { services } = additionalData;

  // Get selected service details
  const getSelectedServiceDetails = () => {
    return selectedServices.map((service) => {
      const serviceDetails = services.find(
        (s) => s.value === service.serviceId
      );
      return {
        ...serviceDetails,
        quantity: service.quantity,
      };
    });
  };

  return (
    <>
      <Card title="Event Reservation Summary" style={{ marginBottom: 16 }}>
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="Event Name">
            {form.getFieldValue("name")}
          </Descriptions.Item>
          <Descriptions.Item label="Expected Guests">
            {form.getFieldValue("expectedGuestCount")}
          </Descriptions.Item>
          <Descriptions.Item label="Start Date" span={2}>
            {form.getFieldValue("dateRange")?.[0]?.format("YYYY-MM-DD HH:mm")}
          </Descriptions.Item>
          <Descriptions.Item label="End Date" span={2}>
            {form.getFieldValue("dateRange")?.[1]?.format("YYYY-MM-DD HH:mm")}
          </Descriptions.Item>
          {form.getFieldValue("note") && (
            <Descriptions.Item label="Notes" span={2}>
              {form.getFieldValue("note")}
            </Descriptions.Item>
          )}
        </Descriptions>

        {selectedServices.length > 0 && (
          <>
            <Divider />
            <Title level={5}>Selected Services</Title>
            {getSelectedServiceDetails().map((service, index) => (
              <div key={index} style={{ marginBottom: 8 }}>
                <Text>
                  {service.label} - Quantity: {service.quantity}
                </Text>
              </div>
            ))}
          </>
        )}
      </Card>

      <Flex justify="space-between" style={{ marginTop: 16 }}>
        <Space>
          <Button onClick={prev}>Previous</Button>
        </Space>
        <FormOnFinishButtons
          isEditing={isEditing}
          confirmLoading={confirmLoading}
          submitText={isEditing ? "Update Event" : "Create Event"}
        />
      </Flex>
    </>
  );
};

export default EventPaymentForm;
