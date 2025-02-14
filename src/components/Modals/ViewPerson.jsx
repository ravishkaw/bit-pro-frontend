import {
  Button,
  Descriptions,
  Divider,
  Flex,
  Modal,
  Space,
  Typography,
} from "antd";
import usePrintContent from "../../hooks/usePrintContent";
import dayjs from "dayjs";

import { capitalize, formatText } from "../../utils/textUtils";

const { Title } = Typography;

// Modal of view person
const ViewPerson = ({ object, viewModal, setViewModal, handleEdit }) => {
  // React print  configuration
  const { contentRef, printFn } = usePrintContent();

  const { open, selectedPerson } = viewModal;

  const closeViewModal = () => {
    setViewModal({ open: false, selectedPerson: null });
  };

  // All value mappings
  const personalInfo = [
    { key: "1", label: "Full Name", value: selectedPerson?.fullName },
    { key: "2", label: "Calling Name", value: selectedPerson?.callingName },
    {
      key: "3",
      label: "Date of Birth",
      value: selectedPerson?.dob
        ? dayjs(selectedPerson.dob).format("YYYY-MM-DD")
        : null,
    },
    { key: "4", label: "Nationality", value: selectedPerson?.nationality },
    { key: "5", label: "ID Type", value: selectedPerson?.idType.toUpperCase() },
    {
      key: "6",
      label: `${
        (selectedPerson && capitalize(selectedPerson?.idType)) || "Id"
      } Number`,
      value: selectedPerson?.idNumber.toUpperCase(),
    },
    {
      key: "7",
      label: "Gender",
      value: selectedPerson && capitalize(formatText(selectedPerson?.gender)),
    },
    {
      key: "8",
      label: "Civil Status",
      value:
        selectedPerson && capitalize(formatText(selectedPerson?.civilStatus)),
    },
    {
      key: "9",
      label: "Note",
      value: selectedPerson?.note,
    },
  ];

  const contactInfo = [
    { key: "1", label: "Address", value: selectedPerson?.address },
    { key: "2", label: "Mobile No", value: selectedPerson?.mobileNo },
    { key: "3", label: "Email", value: selectedPerson?.email },
    { key: "4", label: "Emergency No", value: selectedPerson?.emergencyNo },
  ];

  const employmentInfo = [
    { key: "1", label: "Employee No", value: selectedPerson?.empNo },
    {
      key: "2",
      label: "Designation",
      value: selectedPerson?.designation?.name,
    },
    {
      key: "3",
      label: "Employee Status",
      value: selectedPerson?.employeeStatus,
    },
  ];

  // Render above data into antd descriptions
  const renderDescriptions = (title, data) => (
    <Descriptions title={title}>
      {data.map(({ key, label, value }) => (
        <Descriptions.Item key={key} label={label}>
          {value ? value : "-"}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );

  return (
    <>
      <Modal
        open={open}
        onCancel={closeViewModal}
        maskClosable={false}
        width={850}
        footer={null}
      >
        <div ref={contentRef}>
          <Title level={3}>{`${capitalize(object)} Details - ${
            selectedPerson?.fullName
          }`}</Title>
          <Divider />
          {renderDescriptions("Personal Information", personalInfo)}
          <Divider />
          {renderDescriptions("Contact Information", contactInfo)}

          {/* Show only in employees */}
          {object === "employee" && (
            <>
              <Divider />
              {renderDescriptions("Employment Information", employmentInfo)}
            </>
          )}
        </div>

        <Divider />
        <Flex justify="space-between">
          <Button
            onClick={() => {
              handleEdit(selectedPerson?.id);
              closeViewModal();
            }}
            variant="outlined"
            color="primary"
          >
            Edit
          </Button>
          <Space>
            <Button onClick={() => closeViewModal()}>Close</Button>
            <Button color="primary" variant="solid" onClick={() => printFn()}>
              Print
            </Button>
          </Space>
        </Flex>
      </Modal>
    </>
  );
};

export default ViewPerson;
