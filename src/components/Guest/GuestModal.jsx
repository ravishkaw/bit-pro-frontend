import { Modal, Form, Input, Radio, DatePicker } from "antd";
import dayjs from "dayjs";

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
        style={{ textAlign: "center" }}
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
            rules={[
              { required: true, message: "First name is required" },
              {
                min: 2,
                message: "At least two characters",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Last name is required" },
              {
                min: 2,
                message: "At least two characters",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="NIC"
            name="nic"
            rules={[{ required: true, message: "NIC is required" }]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Gender is required" }]}
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
            rules={[{ required: true, message: "Nationality is required" }]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: "Date of Birth is required" }]}
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
            rules={[{ required: true, message: "Phone number is required" }]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email" },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Emergency Contact"
            name="emergencyContact"
            labelWrap
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
