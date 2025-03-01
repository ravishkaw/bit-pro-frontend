// Custom validations for form inputs
export const formValidations = {
  // First name format validation
  firstNameValidation: [
    { required: true, message: "First name is required" },
    { min: 2, message: "Name should be at least two characters" },
    {
      pattern: /^[A-Z][a-z]+$/,
      message: "First letter should be capitalized, only letters allowed",
    },
  ],

  // Last name format validation
  lastNameValidation: [
    { required: true, message: "Last name is required" },
    { min: 2, message: "Name should be at least two characters" },
    {
      pattern: /^[A-Z][a-z]+$/,
      message: "First letter should be capitalized, only letters allowed",
    },
  ],

  // Full name validation
  fullNameValidation: [
    {
      required: true,
      message: "Full Name is required",
    },
    {
      pattern: /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/,
      message:
        "First letter of each name should be capitalized, only letters allowed",
    },
  ],

  // Calling name validation
  callingNameValidation: [
    { required: true, message: "Calling Name is required" },
    {
      pattern: /^[A-Za-z]+$/,
      message: "Calling name should contain only letters",
    },
  ],

  // Validates ID type is selected
  idTypeValidation: [{ required: true, message: "Please select an ID type" }],

  // Passport validation
  passportValidation: [
    { required: true, message: "Passport number is required" },
    {
      pattern: /^[A-Z0-9]{6,9}$/,
      message: "Passport number must be 6-9 alphanumeric characters",
    },
  ],

  // Sri Lankan NIC format validation
  slNicValidation: [
    { required: true, message: "NIC is required" },
    {
      pattern: /^[0-9]{12}$|^[0-9]{9}[vVxX]$/,
      message:
        "NIC must be either 12 digits or 9 digits followed by 'V' or 'X'",
    },
  ],

  // Other NIC types validation
  otherNicValidation: [
    { required: true, message: "NIC number is required" },
    {
      pattern: /^[A-Z0-9]{5,20}$/i,
      message: "NIC number must be 5-20 alphanumeric characters",
    },
  ],

  // Gender validation
  genderValidation: [{ required: true, message: "Gender is required" }],

  // Civil status  Simple required validation for c
  civilStatusValidation: [
    { required: true, message: "Civil Status is required" },
  ],

  // Nationality  Simple required validation for c
  nationalityValidation: [
    { required: true, message: "Nationality is required" },
  ],

  // Date of birth for reasonable range
  dobValidation: [
    {
      validator: (_, value) => {
        if (!value) {
          return Promise.reject("Date of Birth is required");
        }

        const minDate = new Date("1900-01-01");
        const today = new Date();
        const minAgeDate = new Date();
        minAgeDate.setFullYear(today.getFullYear() - 18);

        if (value.isBefore(minDate) || value.isAfter(minAgeDate)) {
          return Promise.reject(
            "Please enter a valid Date of Birth (must be at least 18 years old)"
          );
        }
        return Promise.resolve();
      },
    },
  ],

  // Phone number format validation
  phoneValidation: [
    { required: true, message: "Phone number is required" },
    {
      pattern: /^\+?[0-9]{8,15}$/,
      message: "Phone number must be 8-15 digits, may start with '+'",
    },
  ],

  // Email format validation
  emailValidation: [
    { required: true, message: "Email is required" },
    { type: "email", message: "Invalid email address" },
  ],

  // Address validation
  addressValidation: [
    { required: true, message: "Address is required" },
    {
      min: 5,
      message: "Address must be at least 5 characters long",
    },
    {
      max: 200,
      message: "Address must not exceed 200 characters",
    },
  ],

  // Emergency contact number format validation
  emergencyContactValidation: [
    {
      // Improved phone pattern that allows common formats
      pattern: /^\+?[0-9]{8,15}$/,
      message: "Emergency contact must be 8-15 digits, may start with '+'",
    },
  ],

  // Note validation
  noteValidation: [
    {
      max: 500,
      message: "Note must not exceed 500 characters",
    },
    {
      pattern: /^[a-zA-Z0-9\s.,!?'"()-]*$/,
      message: "Note can contain letters, numbers, and basic punctuation only",
    },
  ],

  // Username validation
  usernameValidation: [
    { required: true, message: "Please input your username!" },
    { min: 3, message: "Username must be at least 3 characters" },
    { max: 20, message: "Username must not exceed 20 characters" },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers and underscore",
    },
  ],

  // Password validation
  passwordValidation: [
    //required false by default to avoid changes in update/ edit mode
    // { required: true, message: "Please input your password!" },
    { min: 8, message: "Password must be at least 8 characters" },
    { max: 32, message: "Password must not exceed 32 characters" },
    {
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  ],

  // Confirms password match
  passwordConfirmValidation: [
    { required: true, message: "Please confirm your password!" },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("The two passwords do not match!"));
      },
    }),
  ],

  // Confirms password match in update mode
  // In update password may not be changed!
  passwordConfirmValidationInUpdateMode: [
    ({ getFieldValue }) => ({
      validator(_, value) {
        const password = getFieldValue("password");
        if (password && !value) {
          return Promise.reject("Please confirm your password");
        }
        if (password && value !== password) {
          return Promise.reject("The two passwords don't match");
        }
        return Promise.resolve();
      },
    }),
  ],
};
