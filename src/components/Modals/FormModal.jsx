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
import UpdateConfirmModal from "./UpdateConfirmModal";
import dayjs from "dayjs";

const FormModal = ({
  personType,
  addPerson,
  updatePerson,
  designations,
  modalState,
  setModalState,
}) => {
  const [current, setCurrent] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});

  const [updateConfirmModal, setUpdateConfirmModal] = useState({
    open: false,
    updatedValues: null,
    selectedPersonId: null,
    updatedData: null,
  });

  const [form] = Form.useForm();

  const { open, isEditing, selectedPerson } = modalState;

  /*  
    modal open and close form will be reset
    form will be populated depend on isEditing
   */
  useEffect(() => {
    if (open) {
      if (isEditing && selectedPerson) {
        setFormData(selectedPerson);
        setInitialFormData(selectedPerson);
        form.setFieldsValue(selectedPerson);
      } else {
        form.resetFields();
        setFormData({});
        setInitialFormData({});
      }
    } else {
      form.resetFields();
      setCurrent(0);
      setFormData({});
      setInitialFormData({});
    }
  }, [open, isEditing, selectedPerson, form]);

  // Close edit / add form modal
  const closeModal = () => {
    setModalState({
      open: false,
      isEditing: false,
      selectedPerson: null,
    });
  };
  // Handle next button and also validate fields
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

  // handle previous button also validate previous page to show feedback
  const prev = () => {
    setCurrent(current - 1);
    setTimeout(() => {
      form.validateFields();
    }, 0);
  };

  // in edit mode, get the changed values of the form and return it to confirmation modal
  const getChangedFieldValues = (initialData, updatedData) => {
    const changes = [];

    Object.keys(updatedData).forEach((key) => {
      const initialValue = initialData[key];
      const updatedValue = updatedData[key];

      if (initialValue !== updatedValue) {
        let formattedKey = key
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/_/g, " ")
          .toLowerCase();

        let initialDisplayValue = initialValue;
        let updatedDisplayValue = updatedValue;

        if (formattedKey === "dob") {
          formattedKey = "Date of Birth";
          initialDisplayValue = dayjs(initialValue).format("YYYY-MM-DD");
          updatedDisplayValue = dayjs(updatedValue).format("YYYY-MM-DD");
        }

        if (key === "designation") {
          designations.forEach((designation) => {
            if (updatedValue === designation.value) {
              updatedDisplayValue = designation.label;
            }
            if (initialValue === designation.value) {
              initialDisplayValue = designation.label;
            }
          });
        }

        const changeMessage = `${
          formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)
        } changed from "${initialDisplayValue}" to "${updatedDisplayValue}"`;

        changes.push(changeMessage);
      }
    });

    return changes;
  };

  // Show the update confirmation modal with updated data
  const showUpdateModal = (updatedValues, selectedPersonId, updatedData) => {
    setUpdateConfirmModal({
      open: true,
      updatedValues,
      selectedPersonId,
      updatedData,
    });
  };

  // Onfinish function to submit data to the database
  const onFinish = async (values) => {
    const data = { ...formData, ...values };

    // change the data structure to match with the backend
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
      const updatedValues = getChangedFieldValues(initialFormData, data);
      showUpdateModal(updatedValues, selectedPerson.id, updatedData);
    } else {
      setConfirmLoading(true);
      await addPerson(updatedData);
      form.resetFields();
      setFormData({});
      setConfirmLoading(false);
      closeModal();
    }
  };

  /*
    Form steps
    Job information only shows when personType is employee
   */
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
      content: <EmploymentInformation designations={designations} />,
      icon: <IdcardOutlined />,
    },
  ];

  // Set the steps items
  let items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  if (personType !== "Employee") {
    items = items.filter((item) => item.title != "Job Information");
  }

  return (
    <>
      <Modal
        title={isEditing ? `Edit ${personType}` : `Add New ${personType}`}
        open={open}
        onCancel={closeModal}
        maskClosable={false}
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

      {selectedPerson && (
        <UpdateConfirmModal
          personType="Employee"
          updatePerson={updatePerson}
          updateConfirmModal={updateConfirmModal}
          setUpdateConfirmModal={setUpdateConfirmModal}
          closeModal={closeModal}
          form={form}
          setFormData={setFormData}
        />
      )}
    </>
  );
};
export default FormModal;
