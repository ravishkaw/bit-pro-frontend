import {
  Button,
  Divider,
  Flex,
  Space,
  Typography,
  Modal,
  Descriptions,
} from "antd";
import dayjs from "dayjs";

import usePrintContent from "../../hooks/usePrintContent";

import { capitalize } from "../../utils/textUtils";

const { Title } = Typography;

// Modal of view person
const ViewPerson = ({
  additionalData,
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

  // find the label of the selected person values
  const findLabelByValue = (array, value) =>
    array.find((item) => item.value === value)?.label;

  // id type name
  const idType = findLabelByValue(
    additionalData?.idTypes,
    selectedPerson?.idTypeId
  );
  // title name
  const title = findLabelByValue(
    additionalData?.titles,
    selectedPerson?.titleId
  );
  // gender
  const gender = findLabelByValue(
    additionalData?.genders,
    selectedPerson?.genderId
  );
  // civil status
  const getCivilStatus = findLabelByValue(
    additionalData?.civilStatus,
    selectedPerson?.civilStatusId
  );
  // nationality
  const nationality = findLabelByValue(
    additionalData?.nationalities,
    selectedPerson?.nationalityId
  );
  //get desingation
  const getDesignation =
    module == "Employee"
      ? findLabelByValue(
          additionalData?.designations,
          selectedPerson?.designationId
        )
      : null;
  //get employee status
  const getEmployeeStatus =
    module == "Employee"
      ? findLabelByValue(
          additionalData?.employeeStatus,
          selectedPerson?.employeeStatusId
        )
      : null;

  const {
    fullName,
    callingName,
    dob,
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
    { key: "1", label: "Full Name", children: `${title} ${fullName}` },
    { key: "2", label: "Calling Name", children: callingName },
    {
      key: "3",
      label: "Date of Birth",
      children: dob ? dayjs(dob).format("YYYY-MM-DD") : null,
    },
    { key: "4", label: "Nationality", children: nationality },
    { key: "5", label: "ID Type", children: idType },
    {
      key: "6",
      label: `${idType || "Id"} Number`,
      children: idNumber?.toUpperCase(),
    },
    { key: "7", label: "Gender", children: gender },
    { key: "8", label: "Civil Status", children: getCivilStatus },
    { key: "9", label: "Note", children: note || "-" },
  ];

  const contactInfo = [
    { key: "1", label: "Address", children: address },
    { key: "2", label: "Mobile No", children: mobileNo },
    { key: "3", label: "Email", children: email },
    { key: "4", label: "Emergency No", children: emergencyNo },
  ];

  const employmentInfo = [
    { key: "1", label: "Employee No", children: empNo },
    { key: "2", label: "Designation", children: getDesignation },
    { key: "3", label: "Employee Status", children: getEmployeeStatus },
  ];

  return (
    <Modal
      title={null}
      open={open}
      width={850}
      onCancel={closeViewModal}
      footer={null}
    >
      <div ref={contentRef}>
        <Divider orientation="center">
          <Title level={3}>{`${capitalize(module)} Details - ${
            selectedPerson?.fullName
          }`}</Title>
        </Divider>
        <Descriptions title="Personal Information" items={personalInfo} />
        <Divider />
        <Descriptions title={"Contact Information"} items={contactInfo} />
        {/* Show only in employees */}
        {module === "Employee" && (
          <>
            <Divider />
            <Descriptions
              title={"Employment Information"}
              items={employmentInfo}
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
          {/* <Button onClick={() => closeViewModal()}>Close</Button> */}
          <Button type="primary" onClick={() => printFn()}>
            Print
          </Button>
        </Space>
      </Flex>
    </Modal>
  );
};

export default ViewPerson;
