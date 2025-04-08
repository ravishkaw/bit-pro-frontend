import { useEffect, useState, useCallback } from "react";
import { DatePicker, Form, Input, Radio, Row, Col, Select } from "antd";
import dayjs from "dayjs";

import { formValidations } from "./validations";
import { dobGenderCal } from "../../utils/dobGenderCal";
import FormInputTooltip from "./FormInputTooltip";

// First Step of Profile info form - Get personal information
const PersonalInfo = ({
  form,
  formData,
  modelOpen,
  nationalities,
  idTypes,
  genders,
  civilStatus,
  titles,
}) => {
  // Destructure validations
  const {
    fullNameValidation,
    callingNameValidation,
    nationalityValidation,
    idTypeValidation,
    slNicValidation,
    passportValidation,
    otherNicValidation,
    dobValidation,
    genderValidation,
    civilStatusValidation,
    noteValidation,
  } = formValidations;

  const [fullName, setFullName] = useState(formData?.fullName || "");
  const [callingNameOptions, setCallingNameOptions] = useState([]);
  const [idType, setIdType] = useState(formData?.idTypeId || "");
  const [isSriLankan, setIsSriLankan] = useState(false);

  const passportTypeValue = idTypes.find(
    (type) => type.label.toLowerCase() === "passport"
  )?.value;

  const nicTypeValue = idTypes.find(
    (type) => type.label.toLowerCase() === "nic"
  )?.value;

  // Reset state when the modal is closed
  useEffect(() => {
    if (!modelOpen) {
      setFullName(formData?.fullName || "");
      setCallingNameOptions([]);
      setIsSriLankan(false);
      setIdType("");
    }
  }, [modelOpen, formData]);

  // Get nationality name
  const getNationalityName = useCallback(
    (value) => {
      const nationality = nationalities.find((nation) => nation.value == value);
      return nationality?.label || "";
    },
    [nationalities]
  );

  // Update relevant fields when formData changes
  useEffect(() => {
    if (!formData) return;
    const nationalityName = getNationalityName(formData.nationalityId);

    setFullName(formData.fullName || "");
    setIdType(formData.idTypeId || "");
    setIsSriLankan(nationalityName === "Sri Lankan");

    // Update form values
    form.setFieldsValue({
      titleId: formData.titleId,
      idTypeId: formData.idTypeId,
      nationalityId: formData.nationalityId,
      genderId: formData.genderId,
      civilStatusId: formData.civilStatusId,
    });

    // Reset callingName field if fullName is empty
    if (!formData.fullName) {
      form.resetFields(["callingName"]);
    }
  }, [formData, form, getNationalityName]);

  // Generate calling name options
  useEffect(() => {
    const updateCallingNameOptions = (name) => {
      const nameParts = name.split(" ").filter(Boolean);
      return nameParts.map((part) => ({ value: part, label: part }));
    };

    const options = updateCallingNameOptions(fullName);
    setCallingNameOptions(options);

    if (!options.length) {
      form.resetFields(["callingName"]);
    }
  }, [fullName, form]);

  // Restrict employee age to 18 or higher
  const maxDate = dayjs().subtract(18, "years");

  // Handle nationality change and update ID type
  const handleNationality = (value) => {
    const nationalityName = getNationalityName(value);
    const isSriLankan = nationalityName === "Sri Lankan";
    const newIdType = isSriLankan ? nicTypeValue : passportTypeValue; // Use passport as default for non Sri Lankans
    setIsSriLankan(isSriLankan);
    setIdType(newIdType);
    form.setFieldsValue({ idTypeId: newIdType });
    form.resetFields(["idNumber"]); // clear ID number when nationality changes
  };

  // Handle ID type change
  const handleIdTypes = (e) => {
    setIdType(e.target.value);
    form.resetFields(["idNumber"]); // Clear ID number if ID type changes
  };

  // Get ID number validation based on ID type
  const getIdNumberValidation = () => {
    if (idType === passportTypeValue) return passportValidation;
    return isSriLankan ? slNicValidation : otherNicValidation;
  };

  // Handle NIC change and update DOB and Gender based on the NIC for Sri Lankan nationality
  const handleIdNumberChange = (e) => {
    try {
      const nicValue = e.target.value.trim();
      if (idType !== nicTypeValue || !isSriLankan || !nicValue) {
        return;
      }

      const { dob, gender } = dobGenderCal(nicValue);

      if (dob) {
        const selectedGender = genders.find(
          (g) => g.label.toLowerCase() === gender
        );

        form.setFieldsValue({
          dob: dayjs(dob),
          genderId: selectedGender?.value,
        });
      }
    } catch (error) {
      console.error("Error processing NIC:", error);
    }
  };

  return (
    <>
      <Row gutter={16}>
        <Col xs={20} sm={16}>
          <Form.Item
            name="fullName"
            label={
              <FormInputTooltip label="Full Name" title="Enter the full name" />
            }
            rules={fullNameValidation}
            hasFeedback
          >
            <Input
              addonBefore={
                <Select options={titles} placeholder="Title" />
              }
              placeholder="E.g., John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              allowClear
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            name="callingName"
            label={
              <FormInputTooltip
                label="Calling Name"
                title="Choose a calling name"
              />
            }
            rules={callingNameValidation}
            hasFeedback
          >
            <Select
              showSearch
              options={callingNameOptions}
              placeholder="Choose from here"
              notFoundContent="Type Full Name First"
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            name="nationalityId"
            label={
              <FormInputTooltip
                label="Nationality"
                title="Select your nationality"
              />
            }
            rules={nationalityValidation}
            hasFeedback
          >
            <Select
              showSearch
              placeholder="Select nationality"
              optionFilterProp="label"
              options={nationalities}
              onChange={handleNationality}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            label={
              <FormInputTooltip
                label="Identification Type"
                title="Choose ID type"
              />
            }
            name="idTypeId"
            rules={idTypeValidation}
          >
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              block
              onChange={handleIdTypes}
              options={idTypes}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            label={
              <FormInputTooltip
                label={idType === passportTypeValue ? "Passport Number" : "NIC"}
                title="Enter your ID number"
              />
            }
            name="idNumber"
            rules={getIdNumberValidation()}
            hasFeedback
          >
            <Input
              placeholder={
                idType === passportTypeValue
                  ? "Enter passport number"
                  : isSriLankan
                  ? "Ex: 95xxxxxxxV or 200012345678"
                  : "Enter ID number"
              }
              onChange={handleIdNumberChange}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            label={
              <FormInputTooltip
                label="Date of Birth"
                title="Select the birthday"
              />
            }
            name="dob"
            rules={dobValidation}
            required
            hasFeedback
          >
            <DatePicker
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
              placeholder="Select date of birth"
              maxDate={maxDate}
              showNow={false}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            label={
              <FormInputTooltip label="Gender" title="Select the gender" />
            }
            name="genderId"
            rules={genderValidation}
            hasFeedback
          >
            <Radio.Group
              block
              options={genders}
              disabled={idType === nicTypeValue && isSriLankan}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            label={
              <FormInputTooltip
                label="Civil Status"
                title="Select civil status"
              />
            }
            name="civilStatusId"
            rules={civilStatusValidation}
            hasFeedback
          >
            <Select
              options={civilStatus}
              placeholder="Select civil status"
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={<FormInputTooltip label="Note" title="Any additional notes" />}
        name="note"
        rules={noteValidation}
        hasFeedback
      >
        <Input.TextArea placeholder="Additional notes (Optional)" />
      </Form.Item>
    </>
  );
};

export default PersonalInfo;
