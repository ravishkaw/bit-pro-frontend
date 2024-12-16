import { Modal, Form, Input, Radio, DatePicker } from "antd";
import dayjs from "dayjs";

import { formValidations } from "../../utils/validations";

const {
  firstNameValidation,
  lastNameValidation,
  nicValidation,
  genderValidation,
  nationalityValidation,
  dobValidation,
  phoneValidation,
  emailValidation,
  addressValidation,
  emergencyContactValidation,
} = formValidations;

const GuestModal = ({
  isEditing,
  open,
  onCancel,
  form,
  handleSave,
  confirmLoading,
}) => {
  return (
    <>
      <Modal
        title={isEditing ? "Edit The Guest" : "Add New Guest"}
        open={open}
        onCancel={onCancel}
        okText={isEditing ? "Update" : "Add"}
        onOk={() => form.submit()}
        confirmLoading={confirmLoading}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={handleSave}
          labelAlign="left"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={firstNameValidation}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={lastNameValidation}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item label="NIC" name="nic" rules={nicValidation} hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={genderValidation}
            hasFeedback
          >
            <Radio.Group>
              <Radio value={"Male"}>Male</Radio>
              <Radio value={"Female"}>Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Nationality"
            name="nationality"
            rules={nationalityValidation}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={dobValidation}
            hasFeedback
          >
            <DatePicker
              format="YYYY-MM-DD"
              maxDate={dayjs(new Date().toISOString(), "YYYY-MM-DD")}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Phone No"
            name="phone"
            rules={phoneValidation}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={emailValidation}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={addressValidation}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Emergency Contact"
            name="emergencyContact"
            labelWrap
            rules={emergencyContactValidation}
            hasFeedback
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default GuestModal;
