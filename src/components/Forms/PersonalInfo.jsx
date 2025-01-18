import { useEffect, useMemo, useState } from "react";
import { DatePicker, Form, Input, Radio, Row, Col, Select } from "antd";
import dayjs from "dayjs";

import nationalities from "i18n-nationality";
import en from "i18n-nationality/langs/en.json";

import { formValidations } from "./validations";
import { dobGenderCal } from "../../utils/dobGenderCal";

const PersonalInfo = ({ form, formData, modelOpen }) => {
  const [fullName, setFullName] = useState(formData?.fullName || "");
  const [callingNameOptions, setCallingNameOptions] = useState([]);
  const [nationality, setNationality] = useState("");
  const [idType, setIdType] = useState("");
  const [nic, setNic] = useState("");

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

  // Reset state when the modal is closed
  useEffect(() => {
    if (!modelOpen) {
      setFullName(formData?.fullName || "");
      setCallingNameOptions([]);
      setNationality("");
      setIdType("");
      setNic("");
    }
  }, [modelOpen, formData]);

  // Update relevant fields when formData changes
  useEffect(() => {
    const { fullName, idType, nationality } = formData || {};

    setFullName(fullName || "");
    setIdType(idType || "");
    setNationality(nationality || "");
    form.setFieldsValue({ idType });

    // Reset callingName field if fullName is empty
    if (!fullName) {
      form.resetFields(["callingName"]);
    }
  }, [formData?.fullName, formData?.idType, formData?.nationality, form]);

  // Updates the calling name options based on full name input
  useEffect(() => {
    const nameParts = fullName.split(" ").filter(Boolean); //splits the full name into non-empty parts
    setCallingNameOptions(
      nameParts.map((name) => ({ value: name, label: name }))
    );

    if (!nameParts.length) {
      form.resetFields(["callingName"]);
    }
  }, [fullName]);

  // Nationality dropdown options
  // Register English locale for browser support
  nationalities.registerLocale(en);
  const nationalitiesList = Object.values(nationalities.getNames("en"));

  //Memoize nationaltieslist dropdown options to avoid unnecessary re-renders
  const selectNationaltiesItems = useMemo(() => {
    return nationalitiesList.map((nationality) => ({
      value: nationality,
      label: nationality,
    }));
  }, [nationalitiesList]);

  // Restrict employee age to 18 or higher
  const today = new Date();
  const maxEighteenYears = today.setFullYear(today.getFullYear() - 18);

  // update Nationality and update id type based on nationality
  const handleNationality = (value) => {
    setNationality(value);
    const newIdType = value !== "Sri Lankan" ? "passport" : "nic"; //Use passport as default for non Sri Lankans
    setIdType(newIdType);
    form.setFieldsValue({ idType: newIdType });
    form.resetFields(["idNumber"]); // clear ID number when nationality changes
  };

  // Update ID type
  const handleIdTypes = (e) => {
    setIdType(e.target.value);
    form.resetFields(["idNumber"]); //Clear ID number if id type changes
  };

  // Handle NIC change and update DOB and Gender based on the NIC for Sri Lankan nationality
  const handleIdNumberChange = (e) => {
    if (idType !== "nic") return;

    const nicValue = e.target.value.trim();
    setNic(nicValue);

    // For Sri Lankan nationality, calculate and set DOB and Gender if NIC is valid
    if (nationality === "Sri Lankan") {
      if (nicValue) {
        const { dob, gender } = dobGenderCal(nicValue);

        if (dob) {
          form.setFieldsValue({
            dob: dayjs(dob), // Convert DOB to a dayjs object
            gender,
          });
        }
      } else {
        // Reset DOB and Gender fields if NIC is empty
        form.resetFields(["dob", "gender"]);
      }
    }
  };

  // Get Id number validation based on Id type
  const getIdNumberValidation = () => {
    if (idType === "passport") return passportValidation;
    return nationality === "Sri Lankan" ? slNicValidation : otherNicValidation;
  };

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={16}>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={fullNameValidation}
            hasFeedback
          >
            <Input
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
            label="Calling Name"
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
            name="nationality"
            label="Nationality"
            rules={nationalityValidation}
            hasFeedback
          >
            <Select
              showSearch
              placeholder="Eg., Sri Lankan"
              options={selectNationaltiesItems}
              onChange={handleNationality}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            label="Identification Type"
            name="idType"
            rules={idTypeValidation}
          >
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              block
              value={idType}
              onChange={handleIdTypes}
              options={[
                { value: "nic", label: "NIC" },
                { value: "passport", label: "Passport" },
              ]}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            label={idType === "passport" ? "Passport Number" : "NIC"}
            name="idNumber"
            rules={getIdNumberValidation()}
            hasFeedback
          >
            <Input
              placeholder={
                idType === "passport"
                  ? "Enter Passport Number"
                  : nationality === "Sri Lankan"
                  ? "E.g., 95xxxxxxxV or 2000123456789"
                  : "Enter NIC"
              }
              onChange={handleIdNumberChange}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={dobValidation}
            required
            hasFeedback
          >
            <DatePicker
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
              placeholder="Choose your birthdate"
              maxDate={dayjs(maxEighteenYears)}
              showNow={false}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={genderValidation}
            hasFeedback
          >
            <Radio.Group
              block
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
              disabled={idType == "nic" && nationality === "Sri Lankan"}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            label="Civil Status"
            name="civilStatus"
            rules={civilStatusValidation}
            hasFeedback
          >
            <Select
              options={[
                { label: "Married", value: "married" },
                { label: "Unmarried", value: "unmarried" },
                { label: "Prefer not to say", value: "preferNotToSay" },
              ]}
              placeholder="Choose civil status"
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Note" name="note" rules={noteValidation} hasFeedback>
        <Input.TextArea placeholder="Addtional Notes (Optional)" />
      </Form.Item>
    </>
  );
};
export default PersonalInfo;
