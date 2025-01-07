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

  fullNameValidation: [
    {
      required: true,
      message: "Full Name is required",
    },
    {
      pattern: /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*){0,}$/,
      message:
        "First letter should be capitalized of every name and no trailing spaces",
    },
  ],

  callingNameValidation: [
    { required: true, message: "Calling Name is required" },
  ],

  idTypeValidation: [{ required: true, message: "Please select an ID type" }],

  passportValidation: [
    { required: true, message: "Passport number is required" },
  ],

  slNicValidation: [
    { required: true, message: "NIC is required" },
    {
      pattern: /^[0-9]{12}$|^[0-9]{9}[vxVX]$/,
      message:
        "NIC must be either 12 digits or 9 digits followed by 'V' or 'X'",
    },
  ],

  otherNicValidation: [{ required: true, message: "NIC number is required" }],

  genderValidation: [{ required: true, message: "Gender is required" }],

  civilStatusValidation: [
    { required: true, message: "Civil Status is required" },
  ],

  nationalityValidation: [
    { required: true, message: "Nationality is required" },
  ],

  dobValidation: [
    {
      validator: (_, value) => {
        if (
          !value ||
          value.isBefore("1900-01-01") ||
          value.isAfter(new Date().setFullYear(new Date().getFullYear - 18))
        ) {
          return Promise.reject("Please enter a valid Date of Birth");
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

  noteValidation: [
    {
      pattern: /^[a-zA-Z0-9\s.,!?'"()-]{1,500}$/,
      message:
        " Note can contain letters, numbers, and punctuation, and must be between 1 and 500 characters long",
    },
  ],
};
