import { useEffect, useState } from "react";
import { Button, Flex, Form, Modal, Space, Steps } from "antd";
import {
  ContactsOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";

import PersonalInfo from "../Forms/PersonalInfo";
import ContactInformation from "../Forms/ContactInformation";
import EmploymentInformation from "../Forms/EmploymentInformation";

const FormModal = ({
  personType,
  addPerson,
  updatePerson,
  designations,
  modalState,
  closeModal,
}) => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  const { open, isEditing, confirmLoading, selectedPerson } = modalState;

  useEffect(() => {
    if (open) {
      if (isEditing && selectedPerson) {
        setFormData(selectedPerson);
        form.setFieldsValue(selectedPerson);
      } else {
        form.resetFields();
        setFormData({});
      }
    } else {
      setCurrent(0);
      setFormData({});
    }
  }, [open, isEditing, selectedPerson, form]);

  const next = async () => {
    try {
      const values = await form.validateFields();
      const newData = { ...formData, ...values };
      setFormData(newData);
      form.setFieldsValue(newData);
      setCurrent(current + 1);
      if (isEditing) {
        setTimeout(() => {
          form.validateFields();
        }, 0);
      }
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

    if (isEditing) {
      //todo Change the employeeid into id to use in guest future
      await updatePerson(selectedPerson.employeeId, updatedData);
    } else {
      await addPerson(updatedData);
    }

    setTimeout(() => {
      form.resetFields();
      form.setFieldsValue({});
      setFormData({});
    }, 0);
    closeModal();
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
      content: <EmploymentInformation designations={designations} />,
      icon: <IdcardOutlined />,
    },
  ];

  let items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  if (personType !== "Employee") {
    items = items.filter((item) => item.title != "Job Information");
  }

  return (
    <Modal
      title={isEditing ? `Edit ${personType}` : `Add New ${personType}`}
      open={open}
      onCancel={closeModal}
      width={850}
      footer={null}
    >
      <Form form={form} layout="vertical" labelWrap onFinish={onFinish}>
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
              <Button onClick={() => closeModal()}>Cancel</Button>
            )}
            {current > 0 && <Button onClick={prev}>Previous</Button>}
            {current < items.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {current === items.length - 1 && (
              <Button type="primary" htmlType="submit" loading={confirmLoading}>
                {isEditing ? "Update" : "Submit"}
              </Button>
            )}
          </Space>
        </Flex>
      </Form>
    </Modal>
  );
};
export default FormModal;
