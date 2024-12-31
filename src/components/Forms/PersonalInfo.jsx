import { useState } from "react";
import { Button, DatePicker, Flex, Form, Input, Radio, Space } from "antd";
import dayjs from "dayjs";

import { formValidations } from "./validations";
import { dobGenderCal } from "../../utils/dobGenderCal";

const PersonalInfo = ({
  personalInfo,
  setPersonalInfo,
  next,
  handleCancel,
}) => {
  const [nationality, setNationality] = useState("");
  const [otherNationality, setOtherNationality] = useState("");
  const [nic, setNic] = useState("");

  const [form] = Form.useForm();

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

  const handleSubmit = (e) => {
    const formData = {
      ...e,
      nationality: nationality === "other" ? otherNationality : nationality,
    };
    console.log(formData);
    setPersonalInfo(formData);
    next();
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        initialValues={personalInfo}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={firstNameValidation}
          hasFeedback
        >
          <Input placeholder="Eg:- John" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={lastNameValidation}
          hasFeedback
        >
          <Input placeholder="Eg:- Doe" />
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
                ? "95xxxxxxxxxV or 2000123456789"
                : "Enter NIC Number"
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
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
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

        <Flex justify="end">
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button htmlType="submit" type="primary">
              Next
            </Button>
          </Space>
        </Flex>
      </Form>
    </>
  );
};
export default PersonalInfo;
