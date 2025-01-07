import { Col, Form, Input, Row } from "antd";
import { formValidations } from "./validations";

const ContactInformation = () => {
  const {
    addressValidation,
    phoneValidation,
    emailValidation,
    emergencyContactValidation,
  } = formValidations;

  return (
    <>
      <Form.Item
        name="address"
        label="Address"
        rules={addressValidation}
        hasFeedback
      >
        <Input.TextArea placeholder="E.g., 123 Main Street, Colombo" />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={emailValidation} hasFeedback>
        <Input placeholder="E.g., john.doe@example.com" type="email" />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="phone"
            label="Contact Number"
            rules={phoneValidation}
            hasFeedback
          >
            <Input placeholder="E.g., +94 712345678" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="emergencyContact"
            label="Emergency Contact Number"
            rules={emergencyContactValidation}
            hasFeedback
          >
            <Input placeholder="E.g., +94 712345678 (Optional)" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default ContactInformation;
