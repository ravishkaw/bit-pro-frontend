import { Form, Input } from "antd";
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
        <Input.TextArea placeholder="45, xxx,xxx" />
      </Form.Item>
      <Form.Item
        name="contactNumber"
        label="Contact Number"
        rules={phoneValidation}
        hasFeedback
      >
        <Input placeholder="In international format" />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={emailValidation} hasFeedback>
        <Input placeholder="Ex - johndoe@gmail.com" type="email" />
      </Form.Item>

      <Form.Item
        name="emergencyContact"
        label="Emergency Contact Number"
        rules={emergencyContactValidation}
        hasFeedback
      >
        <Input placeholder="In international format" />
      </Form.Item>
    </>
  );
};
export default ContactInformation;
