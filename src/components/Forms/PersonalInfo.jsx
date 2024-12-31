import { useEffect, useState } from "react";
import { DatePicker, Flex, Form, Input, Radio } from "antd";
import dayjs from "dayjs";

import { formValidations } from "./validations";
import { dobGenderCal } from "../../utils/dobGenderCal";

const PersonalInfo = ({ form, formData }) => {
  const [nationality, setNationality] = useState("");
  const [otherNationality, setOtherNationality] = useState("");
  const [nic, setNic] = useState("");

  const {
    firstNameValidation,
    lastNameValidation,
    nationalityValidation,
    nicValidation,
    dobValidation,
    genderValidation,
  } = formValidations;

  // Nationality change handlers
  const nationalityChange = (e) => {
    setNationality(e.target.value);
    if (e.target.value !== "other") {
      setOtherNationality("");
    }
  };

  const handleOtherNationalityChange = (e) => {
    setNationality("other");
    setOtherNationality(e.target.value);
  };

  // If user clicks previous from next steps, this implementation helps to populate the nationality based on previous value
  useEffect(() => {
    const { nationality } = formData || {};
    if (nationality) {
      const isOther = nationality !== "srilankan";
      setOtherNationality(isOther ? nationality : "");
      setNationality(isOther ? "other" : "srilankan");
    }
  }, [formData]);

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
        rules={[
          ...nationalityValidation,
          {
            validator: (_, value) => {
              if (value === "other" && !otherNationality.trim()) {
                return Promise.reject(
                  new Error("Please specify your nationality.")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
        hasFeedback
      >
        <Flex>
          <Radio.Group onChange={nationalityChange} value={nationality}>
            <Radio value="srilankan">Sri Lankan</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
          {nationality !== "srilankan" && (
            <Input
              placeholder="Ex: American"
              value={otherNationality}
              onChange={handleOtherNationalityChange}
            />
          )}
        </Flex>
      </Form.Item>

      <Form.Item
        label="NIC"
        name="nic"
        rules={
          nationality == "srilankan"
            ? nicValidation
            : [
                {
                  required: true,
                },
              ]
        }
        hasFeedback
      >
        <Input
          placeholder={
            nationality == "srilankan"
              ? "E.g., 95XXXXXXXXXV or 2000123456789"
              : "NIC Number"
          }
          value={nic}
          onChange={handleNICChange}
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
          ]}
          disabled={nationality === "srilankan"}
        />
      </Form.Item>
    </>
  );
};
export default PersonalInfo;
