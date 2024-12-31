import { Form, Input } from "antd";

const ContactInformation = () => {
  return (
    <>
      <Form>
        <Form.Item
          name="note"
          label="Phone Number"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};
export default ContactInformation;
