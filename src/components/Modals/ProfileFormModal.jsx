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

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

// Profile modal for view add and update profile form
const ProfileFormModal = ({
  personType,
  addPerson,
  designations,
  employeeStatus,
  formModalState,
  showUpdateModal,
  closeFormModal,
}) => {
  const [current, setCurrent] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});

  const [form] = Form.useForm();

  const { open, isEditing, selectedPerson } = formModalState;

  // sets data based on form modal state
  useEffect(() => {
    if (open && isEditing && selectedPerson) {
      const updatedPerson = {
        ...selectedPerson,
        designation: selectedPerson.designation.id,
      };
      setFormData(updatedPerson);
      setInitialFormData(updatedPerson);
      form.setFieldsValue(updatedPerson);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
      setFormData({});
      setInitialFormData({});
    }
  }, [open, isEditing, selectedPerson, form]);

  // Next button of the step form
  const next = async () => {
    try {
      const values = await form.validateFields(); // validate values before goes to next step
      const newData = { ...formData, ...values };
      setFormData(newData);
      form.setFieldsValue(newData);
      setCurrent(current + 1);

      // trigger form validation in edit mode
      if (isEditing) {
        triggerFormFieldsValidation(form);
      }
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  // Previous button of the step form
  const prev = () => {
    setCurrent(current - 1);
    triggerFormFieldsValidation(form); // trigger validation
  };

  const onFinish = async (values) => {
    // get data from all the input fields
    const data = { ...formData, ...values };

    // Format the data to match the format of backend
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
      // Get the changed values and pass it into confirmation modal
      const updatedValues = getChangedFieldValues(
        initialFormData,
        data,
        personType,
        designations
      );
      showUpdateModal(updatedValues, selectedPerson.id, updatedData);
    } else {
      setConfirmLoading(true);
      await addPerson(updatedData);
      form.resetFields();
      setFormData({});
      setConfirmLoading(false);
      closeFormModal();
    }
  };

  // After close modal operations
  const afterModalClose = () => {
    setCurrent(0);
    setFormData({});
    form.resetFields();
    setInitialFormData({});
  };

  // Steps of the step form
  const steps = [
    {
      title: "Personal Information",
      content: (
        <PersonalInfo form={form} formData={formData} modalOpen={open} />
      ),
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
          designations={designations}
          employeeStatus={employeeStatus}
        />
      ),
      icon: <IdcardOutlined />,
    },
  ];

  // Map steps into the Antd step component based on person type
  const items = steps
    .filter(
      (item) => personType == "employee" || item.title != "Job Information"
    )
    .map((item) => ({
      key: item.title,
      title: item.title,
      icon: item.icon,
    }));

  return (
    <Modal
      title={isEditing ? `Edit ${personType}` : `Add New ${personType}`}
      open={open}
      width={850}
      footer={null}
      maskClosable={false}
      onCancel={closeFormModal}
      afterClose={afterModalClose}
      destroyOnClose
    >
      <Form form={form} layout="vertical" labelWrap onFinish={onFinish}>
        <Steps
          type="navigation"
          size="small"
          current={current}
          items={items}
          className="site-navigation-steps"
        />
        <div style={{ marginTop: 16 }}>{steps[current].content}</div>

        <Flex justify={isEditing ? "end" : "space-between"}>
          {!isEditing && (
            <Button
              color="default"
              variant="dashed"
              onClick={() => {
                form.resetFields();
                setCurrent(0);
              }}
            >
              Reset
            </Button>
          )}
          <Space>
            {current === 0 && <Button onClick={closeFormModal}>Cancel</Button>}
            {current > 0 && <Button onClick={prev}>Previous</Button>}
            {current < items.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {current === items.length - 1 && (
              <Button
                color={isEditing ? "primary" : "green"}
                variant="solid"
                htmlType="submit"
                loading={confirmLoading}
              >
                {isEditing ? "Update" : "Submit"}
              </Button>
            )}
          </Space>
        </Flex>
      </Form>
    </Modal>
  );
};

export default ProfileFormModal;
