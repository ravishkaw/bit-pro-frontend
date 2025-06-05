import {
  Form,
  Input,
  Button,
  InputNumber,
  Row,
  Col,
  Space,
  Flex,
  Typography,
} from "antd";
import FormInputTooltip from "./FormInputTooltip";
import { useThemeContext } from "../../contexts/ThemeContext";
import { formValidations } from "./validations";

const { Text } = Typography;

const EventServicesForm = ({
  form,
  isEditing,
  setCurrent,
  next,
  prev,
  setFormData,
  formData,
  additionalData,
  selectedServices,
  setSelectedServices,
}) => {
  const { isDarkMode } = useThemeContext();
  const { services } = additionalData;
  const { noteValidation } = formValidations;

  // Handle service quantity change
  const handleServiceQuantityChange = (serviceId, newQty) => {
    const newQuantity = Math.max(0, Math.min(50, newQty || 0));

    setSelectedServices((prevServices) => {
      // If quantity is 0, remove from selection
      if (newQuantity === 0) {
        return prevServices.filter(
          (service) => service.serviceId !== serviceId
        );
      }

      // If already selected, update quantity
      const existingIndex = prevServices.findIndex(
        (service) => service.serviceId === serviceId
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
      return [...prevServices, { serviceId: serviceId, quantity: newQuantity }];
    });
  };

  // Handle reset button click
  const handleReset = () => {
    form.resetFields();
    setCurrent(0);
    setFormData({});
    setSelectedServices([]);
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="note"
            label={
              <FormInputTooltip
                label="Notes"
                title="Enter any additional notes for the event"
              />
            }
            rules={noteValidation}
            hasFeedback
          >
            <Input.TextArea
              placeholder="Any special requirements or notes..."
              rows={3}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Add Optional Services">
            <div
              style={{
                border: `1px solid ${isDarkMode ? "#464963" : "#e5e6e8"}`,
                padding: "16px",
                borderRadius: 8,
                maxHeight: 300,
                overflowY: "auto",
              }}
            >
              <Row gutter={[16, 16]}>
                {services?.map((service) => {
                  const selectedService = selectedServices.find(
                    (s) => s.serviceId === service.value
                  );
                  const quantity = selectedService
                    ? selectedService.quantity
                    : 0;

                  return (
                    <Col span={12} key={service.value}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          border: `1px solid ${
                            isDarkMode ? "#303246" : "#f0f0f0"
                          }`,
                          borderRadius: 6,
                          backgroundColor: isDarkMode ? "#1f1f1f" : "#fafafa",
                        }}
                      >
                        <div style={{ flex: 1, marginRight: 8 }}>
                          <Text>{service.label}</Text>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Button
                            type="default"
                            size="small"
                            onClick={() =>
                              handleServiceQuantityChange(
                                service.value,
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
                            max={50}
                            value={quantity}
                            onChange={(value) =>
                              handleServiceQuantityChange(service.value, value)
                            }
                            style={{
                              width: 50,
                              textAlign: "center",
                            }}
                          />
                          <Button
                            type="default"
                            size="small"
                            onClick={() =>
                              handleServiceQuantityChange(
                                service.value,
                                quantity + 1
                              )
                            }
                            disabled={quantity >= 50}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="services" noStyle hidden>
        <Input hidden />
      </Form.Item>

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
          <Button type="primary" onClick={next}>
            Next
          </Button>
        </Space>
      </Flex>
    </>
  );
};

export default EventServicesForm;
