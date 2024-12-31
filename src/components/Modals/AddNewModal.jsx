import { Button, Modal, Steps } from "antd";
import PersonalInfo from "../Forms/PersonalInfo";
import { useState } from "react";
import ContactInformation from "../Forms/ContactInformation";
import {
  ContactsOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";

const AddNewModal = ({ isModalOpen, setIsModalOpen, personType }) => {
  const [current, setCurrent] = useState(0);

  const [personalInfo, setPersonalInfo] = useState(null);

  /* These are to handle the button operations */
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Personal Information",
      content: (
        <PersonalInfo
          initialValues={personalInfo}
          setPersonalInfo={setPersonalInfo}
          next={next}
          handleCancel={handleCancel}
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
      title: "Employeement Information",
      content: <ContactInformation />,
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
      <Steps current={current} size="small" items={items} />
      <div style={{ marginTop: 16 }}>{steps[current].content}</div>
    </Modal>
  );
};
export default AddNewModal;
