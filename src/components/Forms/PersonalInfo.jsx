import { useEffect, useState } from "react";
import { DatePicker, Flex, Form, Input, Radio, Row, Select } from "antd";
import dayjs from "dayjs";

import nationalities from "i18n-nationality";
import en from "i18n-nationality/langs/en.json";

import { formValidations } from "./validations";
import { dobGenderCal } from "../../utils/dobGenderCal";

const PersonalInfo = ({ form, formData }) => {
  const [nationality, setNationality] = useState("");
  const [idType, setIdType] = useState("");
  const [nic, setNic] = useState("");

  const {
    firstNameValidation,
    lastNameValidation,
    nationalityValidation,
    nicValidation,
    dobValidation,
    genderValidation,
  } = formValidations;

  // Nationality dropdown select format
  nationalities.registerLocale(en);
  const nationalitiesList = Object.values(nationalities.getNames("en"));
  const selectOptionItems = nationalitiesList.map((nationality) => ({
    value: nationality,
    label: nationality,
  }));

  // NIC Change Handler
  const handleNICChange = (e) => {
    const nicValue = e.target.value;
    setNic(nicValue);

    // Calculate DOB and Gender if NIC is valid and nationality is Sri Lankan
    // Note : There are some batch of Ids that not giving the correct dob. So don't disable dob field.
    if (nationality === "srilankan" && nicValue) {
      const { dob, gender } = dobGenderCal(nicValue);
      if (dob) {
        form.setFieldsValue({
          dob: dayjs(dob),
          gender: gender,
        });
      }
    }
  };

  return (
    <>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={firstNameValidation}
        hasFeedback
      >
        <Input placeholder="E.g., John" />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={lastNameValidation}
        hasFeedback
      >
        <Input placeholder="E.g., Doe" />
      </Form.Item>

      <Form.Item
        name="nationality"
        label="Nationality"
        rules={nationalityValidation}
        hasFeedback
      >
        <Select
          showSearch
          placeholder="Eg., Sri Lankan"
          defaultValue="Sri Lankan"
          optionFilterProp="label"
          options={selectOptionItems}
        />
      </Form.Item>

      <Form.Item
        label="Identification Type"
        name="idType"
        rules={[{ required: true, message: "Please select an ID type" }]}
      >
        <Select
          options={[
            { value: "nic", label: "NIC" },
            { value: "passport", label: "Passport" },
          ]}
          placeholder="select"
          onChange={(value) => setIdType(value)}
        />
      </Form.Item>

      <Form.Item
        label={idType === "passport" ? "Passport Number" : "NIC"}
        name="idNumber"
        rules={[{ required: true, message: "Number required" }]}
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
        />
      </Form.Item>

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
        />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={genderValidation}
        hasFeedback
      >
        <Radio.Group
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />
      </Form.Item>
    </>
  );
};
export default PersonalInfo;
