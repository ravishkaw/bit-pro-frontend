import { useEffect, useState } from "react";
import { Button, Flex, Form, Modal, Space, Steps, message } from "antd";
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
  additionalData,
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
}) => {
  const [current, setCurrent] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    designations = {},
    employeeStatus = {},
    nationalities,
    idTypes,
    genders,
    civilStatus,
    titles,
  } = additionalData;

  // sets formdata based on form modal state
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      setFormData(selectedObject);
      setInitialFormData(selectedObject);
      form.setFieldsValue(selectedObject);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
      setFormData({});
      setInitialFormData({});
    }
  }, [open, isEditing, selectedObject, form]);

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
      messageApi.error("Please fill all the required fields");
    }
  };

  // Previous button of the step form
  const prev = () => {
    setCurrent(current - 1);
    triggerFormFieldsValidation(form); // trigger validation
  };

  const onFinish = async (values) => {
    // get formdata from all the input fields
    const data = { ...formData, ...values };

    if (isEditing) {
      // Get the changed values and pass it into confirmation modal
      const updatedValues = getChangedFieldValues(initialFormData, data, {
        module,
        designations,
        employeeStatus,
        nationalities,
        idTypes,
        genders,
        civilStatus,
        titles,
      });
      showUpdateConfirmModal(updatedValues, selectedObject.id, data);
    } else {
      setConfirmLoading(true);
      await addItem(data);
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
        <PersonalInfo
          form={form}
          formData={formData}
          modalOpen={open}
          nationalities={nationalities}
          idTypes={idTypes}
          genders={genders}
          civilStatus={civilStatus}
          titles={titles}
          module={module}
        />
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
    .filter((item) => module == "Employee" || item.title != "Job Information")
    .map((item) => ({
      key: item.title,
      title: item.title,
      icon: item.icon,
    }));

  return (
    <>
      {contextHolder}
      <Modal
        title={`${!isEditing ? "Add New" : "Update"} ${module}`}
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
            onChange={(clickedStep) => {
              if (clickedStep > current) {
                next();
              } else if (clickedStep < current) {
                setCurrent(clickedStep);
                triggerFormFieldsValidation(form); 
              }
            }}
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
              {/* {current === 0 && <Button onClick={closeFormModal}>Cancel</Button>} */}
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
    </>
  );
};

export default ProfileFormModal;
