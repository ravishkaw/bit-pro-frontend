import { Button, Flex, Form, Modal, Space, Steps } from "antd";
import PersonalInfo from "../Forms/PersonalInfo";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  ContactsOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";

import ContactInformation from "../Forms/ContactInformation";
import EmploymentInformation from "../Forms/EmploymentInformation";

const FormModal = ({
  isModalOpen,
  setIsModalOpen,
  personType,
  addAnEmployee,
  loading,
  getEmployeeDesignation,
}) => {
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

  const onFinish = async (values) => {
    const data = { ...formData, ...values };

    const updatedData = {
      ...data,
      designation: {
        id: data.designation,
      },
      employeeStatus: {
        name: data.employeeStatus,
      },
    };
    await addAnEmployee(updatedData);
    form.resetFields();
    setFormData({});
    setIsModalOpen(false);
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
      title: "Job Information",
      content: (
        <EmploymentInformation
          getEmployeeDesignation={getEmployeeDesignation}
        />
      ),
      icon: <IdcardOutlined />,
    },
  ];

  let items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  if (personType != "Employee") {
    items = items.filter((item) => item.title != "Employeement Info");
  }

  return (
    <Modal
      title={`Add New ${personType}`}
      open={isModalOpen}
      onCancel={handleCancel}
      width={850}
      footer={null}
    >
      <Form
        form={form}
        initialValues={formData}
        layout="vertical"
        labelWrap
        onFinish={onFinish}
      >
        {/* Steps */}
        <Steps
          type="navigation"
          size="small"
          current={current}
          items={items}
          className="site-navigation-steps"
        />
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
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            )}
          </Space>
        </Flex>
      </Form>
    </Modal>
  );
};
export default FormModal;
