import { useEffect, useState } from "react";
import { DatePicker, Flex, Form, Input, Radio, Row, Col, Select } from "antd";
import dayjs from "dayjs";

import nationalities from "i18n-nationality";
import en from "i18n-nationality/langs/en.json";

import { formValidations } from "./validations";
import { dobGenderCal } from "../../utils/dobGenderCal";

const PersonalInfo = ({ form, formData }) => {
  const [fullName, setFullName] = useState("");
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
    dobValidation,
    genderValidation,
    civilStatusValidation,
  } = formValidations;

  // Calling name generator
  useEffect(() => {
    if (fullName) {
      const nameParts = fullName.split(" ").filter(Boolean);
      setCallingNameOptions(
        nameParts.map((name) => ({ value: name, label: name }))
      );
    } else {
      setCallingNameOptions([]);
      form.setFieldsValue({ callingName: undefined });
      form.resetFields(["callingName"]);
    }
  }, [fullName]);

  // Nationality dropdown select format
  nationalities.registerLocale(en);
  const nationalitiesList = Object.values(nationalities.getNames("en"));
  const selectNationaltiesItems = nationalitiesList.map((nationality) => ({
    value: nationality,
    label: nationality,
  }));

  // Employee age allow only 18+
  const today = new Date();
  const maxEighteenYears = today.setFullYear(today.getFullYear() - 18);

  // NIC Change Handler
  const handleNICChange = (e) => {
    if (idType === "nic") {
      const nicValue = e.target.value;
      setNic(nicValue);
      // Calculate DOB and Gender if NIC is valid and nationality is Sri Lankan
      // Note : There are some batch of Ids that not giving the correct dob. So don't disable dob field.
      if (nationality === "Sri Lankan" && nicValue) {
        const { dob, gender } = dobGenderCal(nicValue);
        if (dob) {
          form.setFieldsValue({
            dob: dayjs(dob),
            gender: gender,
          });
        }
      }
    }
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
              onChange={(value) => setNationality(value)}
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
              block
              options={[
                { value: "nic", label: "NIC" },
                { value: "passport", label: "Passport" },
              ]}
              onChange={(e) => {
                setIdType(e.target.value), form.resetFields(["idNumber"]);
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            label={idType === "passport" ? "Passport Number" : "NIC"}
            name="idNumber"
            rules={
              idType === "nic"
                ? slNicValidation
                : [{ required: true, message: "Passport number is required" }]
            }
            hasFeedback
          >
            <Input
              placeholder={
                idType === "passport"
                  ? "Enter Passport Number"
                  : nationality === "Sri Lankan"
                  ? "E.g., 95XXXXXXXXXV or 2000123456789"
                  : "Enter NIC"
              }
              onChange={handleNICChange}
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
            hasFeedback
          >
            <DatePicker
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
              placeholder="Choose your birthdate"
              maxDate={dayjs(maxEighteenYears)}
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

      <Form.Item label="Note" name="note" hasFeedback>
        <Input.TextArea placeholder="Addtional Notes (Optional)"/>
      </Form.Item>
    </>
  );
};
export default PersonalInfo;
