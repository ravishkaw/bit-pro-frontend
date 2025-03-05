import { Button, Divider, Flex, Space, Typography, Modal } from "antd";
import dayjs from "dayjs";

import useEmployees from "../../hooks/useEmployees";
import usePrintContent from "../../hooks/usePrintContent";

import { capitalize } from "../../utils/textUtils";
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

  const { idTypes, genders, civilStatus, designations, employeeStatus } =
    useEmployees();

  // find the label of the selected person values
  const findLabelByValue = (array, value) =>
    array.find((item) => item.value === value)?.label;

  // id type name
  const idType = findLabelByValue(idTypes, selectedPerson?.idTypeId);
  // gender
  const gender = findLabelByValue(genders, selectedPerson?.genderId);
  // civil status
  const getCivilStatus = findLabelByValue(
    civilStatus,
    selectedPerson?.civilStatusId
  );
  //get desingation
  const getDesignation = findLabelByValue(
    designations,
    selectedPerson?.designationId
  );
  //get employee status
  const getEmployeeStatus = findLabelByValue(
    employeeStatus,
    selectedPerson?.employeeStatusId
  );

  const {
    fullName,
    callingName,
    dob,
    nationalityName,
    idNumber,
    note,
    address,
    mobileNo,
    email,
    emergencyNo,
    empNo,
  } = selectedPerson || {};

  // All value mappings
  const personalInfo = [
    { key: "1", label: "Full Name", value: fullName },
    { key: "2", label: "Calling Name", value: callingName },
    {
      key: "3",
      label: "Date of Birth",
      value: dob ? dayjs(dob).format("YYYY-MM-DD") : null,
    },
    { key: "4", label: "Nationality", value: nationalityName },
    { key: "5", label: "ID Type", value: idType },
    {
      key: "6",
      label: `${idType || "Id"} Number`,
      value: idNumber?.toUpperCase(),
    },
    { key: "7", label: "Gender", value: gender },
    { key: "8", label: "Civil Status", value: getCivilStatus },
    { key: "9", label: "Note", value: note },
  ];

  const contactInfo = [
    { key: "1", label: "Address", value: address },
    { key: "2", label: "Mobile No", value: mobileNo },
    { key: "3", label: "Email", value: email },
    { key: "4", label: "Emergency No", value: emergencyNo },
  ];

  const employmentInfo = [
    { key: "1", label: "Employee No", value: empNo },
    { key: "2", label: "Designation", value: getDesignation },
    { key: "3", label: "Employee Status", value: getEmployeeStatus },
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
          <Button type="primary" onClick={() => printFn()}>
            Print
          </Button>
        </Space>
      </Flex>
    </Modal>
  );
};

export default ViewPerson;
