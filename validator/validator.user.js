yup = require("yup");
const loginValidator = yup.object().shape({
  password: yup.string().required().max(1024).min(8),
  email: yup.string().email().required(),
});
const userValidator = yup.object().shape({
  firstName: yup.string().required().max(255),
  lastName: yup.string().required().max(255),
  password: yup.string().required().max(1024).min(8),
  email: yup.string().email().required(),
  birthDate: yup.date().required(),
  gender: yup.string().required().max(255).oneOf(["male", "female", "other"]),
});

module.exports = { userValidator, loginValidator };
