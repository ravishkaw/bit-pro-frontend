import { Button, Flex, Form, Modal, Space, Steps } from "antd";
import PersonalInfo from "../Forms/PersonalInfo";
import { useState } from "react";
import ContactInformation from "../Forms/ContactInformation";
import {
  ContactsOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import EmploymentInformation from "../Forms/EmploymentInformation";

const AddNewModal = ({ isModalOpen, setIsModalOpen, personType }) => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  /* These are to handle the button operations */
  const handleCancel = () => {
    form.resetFields();
    setFormData({});
    setIsModalOpen(false);
  };

  const next = async () => {
    try {
      const values = await form.validateFields();
      const newData = { ...formData, ...values };
      setFormData(newData);
      form.setFieldsValue(newData);
      setCurrent(current + 1);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
    setTimeout(() => {
      form.validateFields();
    }, 0);
  };

  const onFinish = (values) => {
    const updatedData = { ...formData, ...values };
    setFormData(updatedData);
    console.log(updatedData);
  };

  const steps = [
    {
      title: "Personal Information",
      content: <PersonalInfo form={form} formData={formData} />,
      icon: <UserOutlined />,
    },
    {
      title: "Contact Information",
      content: <ContactInformation />,
      icon: <ContactsOutlined />,
    },
    {
      title: "Employeement Information",
      content: <EmploymentInformation />,
      icon: <IdcardOutlined />,
    },
  ];

  let items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  if (personType != "Employee") {
    items = items.filter((item) => item.title != "Employeement Information");
  }

  return (
    <Modal
      title={`Add New ${personType}`}
      open={isModalOpen}
      onCancel={handleCancel}
      width={600}
      footer={null}
    >
      <Form
        form={form}
        initialValues={formData}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        labelWrap
        onFinish={onFinish}
      >
        {/* Steps */}
        <Steps current={current} size="small" items={items} />
        <div style={{ marginTop: 16 }}>{steps[current].content}</div>

        {/* Buttons */}
        <Flex justify="end">
          <Space>
            {current === 0 && (
              <Button onClick={() => handleCancel()}>Cancel</Button>
            )}
            {current > 0 && <Button onClick={prev}>Previous</Button>}
            {current < items.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {current === items.length - 1 && (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </Space>
        </Flex>
      </Form>
    </Modal>
  );
};
export default AddNewModal;
