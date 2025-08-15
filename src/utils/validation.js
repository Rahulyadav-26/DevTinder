const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("firstName and lastName are required");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("firstName must be between 4 and 50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email format");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be at strong");
  }
};

module.exports = {
    validateSignupData
};