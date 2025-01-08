import { useEffect, useState } from "react";
import { Button, Flex, Form, Modal, Space, Steps } from "antd";
import {
  ContactsOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import PersonalInfo from "../Forms/PersonalInfo";
import ContactInformation from "../Forms/ContactInformation";
import EmploymentInformation from "../Forms/EmploymentInformation";

const FormModal = ({
  personType,
  addAnEmployee,
  updateAnEmployee,
  getEmployeeDesignation,
  modalState,
  closeModal,
}) => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  const [designations, setDesignations] = useState([
    { value: 1, label: "Staff" },
  ]);

  const { open, isEditing, confirmLoading, selectedEmployee } = modalState;

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await getEmployeeDesignation();
        const mappedDesignations = response.map((designation) => ({
          value: designation.id,
          label: designation.name,
        }));
        setDesignations(mappedDesignations);

        if (isEditing && selectedEmployee) {
          form.setFieldsValue({
            ...selectedEmployee,
            dob: dayjs(selectedEmployee.dob),
            designation: selectedEmployee.designation.id,
            employeeStatus: selectedEmployee.employeeStatus.name,
          });
          setFormData(selectedEmployee);
          console.log(selectedEmployee);
        } else {
          form.resetFields();
          setFormData({});
        }
      } catch (error) {
        console.error("Failed to fetch designations:", error);
      }
    };

    if (open) {
      fetchDesignations();
    }
  }, [open, isEditing, selectedEmployee, form, getEmployeeDesignation]);

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

    if (isEditing) {
      await updateAnEmployee(selectedEmployee.employeeId, updatedData);
    } else {
      await addAnEmployee(updatedData);
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

  if (personType != "Employee") {
    items = items.filter((item) => item.title != "Employeement Info");
  }

  return (
    <Modal
      title={`Add New ${personType}`}
      open={open}
      onCancel={closeModal}
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
