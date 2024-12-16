export const formValidations = {
  firstNameValidation: [
    { required: true, message: "First name is required" },
    { min: 2, message: "Name should be at least two characters" },
    {
      pattern: /^[A-Z][a-z]*\S$/,
      message: "First letter should be capitalized and no trailing spaces",
    },
  ],
  lastNameValidation: [
    { required: true, message: "Last name is required" },
    { min: 2, message: "Name should be at least two characters" },
    {
      pattern: /^[A-Z][a-z]*\S$/,
      message: "First letter should be capitalized and no trailing spaces",
    },
  ],
  nicValidation: [
    { required: true, message: "NIC is required" },
    {
      pattern: /^[0-9]{12}$|^[0-9]{9}[vxVX]$/,
      message:
        "NIC must be either 12 digits or 9 digits followed by 'V' or 'X'",
    },
  ],
  genderValidation: [{ required: true, message: "Gender is required" }],
  nationalityValidation: [
    { required: true, message: "Nationality is required" },
  ],
  dobValidation: [
    { required: true, message: "Date of Birth is required" },
    {
      validator: (_, value) => {
        if (
          !value ||
          value.isBefore("1900-01-01") ||
          value.isAfter(new Date())
        ) {
          return Promise.reject("Date of Birth must be valid and realistic");
        }
        return Promise.resolve();
      },
    },
  ],
  phoneValidation: [
    { required: true, message: "Phone number is required" },
    {
      pattern: /^\+?[1-9]\d{1,14}$/,
      message: "Phone number must be a valid international number",
    },
  ],
  emailValidation: [
    { required: true, message: "Email is required" },
    { type: "email", message: "Invalid email address" },
  ],
  addressValidation: [
    { required: true, message: "Address is required" },
    {
      min: 5,
      message: "Address must be at least 5 characters long",
    },
  ],
  emergencyContactValidation: [
    {
      pattern: /^\+?[1-9]\d{1,14}$/,
      message: "Emergency contact must be a valid international number",
    },
  ],
};
