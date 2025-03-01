import { Button, Divider, Flex, Space, Typography, Modal } from "antd";
import usePrintContent from "../../hooks/usePrintContent";
import dayjs from "dayjs";

import { capitalize, formatText } from "../../utils/textUtils";
import DescriptionsSection from "./DescriptionsSection";

const { Title } = Typography;

// Modal of view person
const ViewPerson = ({
  module,
  viewModal,
  modulePrivileges,
  closeViewModal,
  handleEdit,
  loadOneItem,
}) => {
  // React print  configuration
  const { contentRef, printFn } = usePrintContent();
  const { open, selectedObject: selectedPerson } = viewModal;

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

  return (
    <Modal
      title={null}
      open={open}
      width={800}
      onCancel={closeViewModal}
      footer={null}
    >
      <div ref={contentRef}>
        <Title level={3}>{`${capitalize(module)} Details - ${
          selectedPerson?.fullName
        }`}</Title>
        <Divider />
        <DescriptionsSection
          title={"Personal Information"}
          data={personalInfo}
        />
        <Divider />

        <DescriptionsSection title={"Contact Information"} data={contactInfo} />
        {/* Show only in employees */}
        {module === "Employee" && (
          <>
            <Divider />
            <DescriptionsSection
              title={"Employment Information"}
              data={employmentInfo}
            />
          </>
        )}
      </div>

      <Divider />
      <Flex justify="space-between">
        {modulePrivileges.update_privilege ? (
          <Button
            onClick={() => {
              closeViewModal();
              handleEdit(loadOneItem, selectedPerson?.id);
            }}
            variant="outlined"
            color="primary"
          >
            Edit
          </Button>
        ) : (
          <span></span>
        )}
        <Space>
          <Button onClick={() => closeViewModal()}>Close</Button>
          <Button color="primary" variant="solid" onClick={() => printFn()}>
            Print
          </Button>
        </Space>
      </Flex>
    </Modal>
  );
};

export default ViewPerson;
