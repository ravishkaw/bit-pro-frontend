import { Col, Form, Input, Row } from "antd";
import { formValidations } from "./validations";
import FormInputTooltip from "./FormInputTooltip";

// Second Step of Profile info form - Get contact information
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
        label={
          <FormInputTooltip
            label="Address"
            title="Enter the residence address"
          />
        }
        rules={addressValidation}
        hasFeedback
      >
        <Input.TextArea placeholder="Enter your address" />
      </Form.Item>

      <Form.Item
        name="email"
        label={<FormInputTooltip label="Email" title="Enter the email" />}
        rules={emailValidation}
        hasFeedback
      >
        <Input placeholder="Ex: john@gmail.com" type="email" />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="mobileNo"
            label={
              <FormInputTooltip label="Contact Number" title="Phone number" />
            }
            rules={phoneValidation}
            hasFeedback
          >
            <Input placeholder="Ex: 0712345678" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="emergencyNo"
            label={
              <FormInputTooltip
                label="Emergency Contact"
                title="Emergency phone number"
              />
            }
            rules={emergencyContactValidation}
            hasFeedback
          >
            <Input placeholder="Emergency contact number (Optional)" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ContactInformation;
