const joi = require("joi");
const { logInUser } = require("../../Controllers/userController");

const userSchema = joi.object({
  firstName: joi.string().min(3).max(30).required(false).messages({
    "string.min": "First name should have a minimum length of {#limit}",
    "string.max": "First name should have a maximum length of {#limit}",
  }),
  lastName: joi.string().min(3).max(30).required(false).messages({
    "string.min": "Last name should have a minimum length of {#limit}",
    "string.max": "Last name should have a maximum length of {#limit}",
  }),
  userName:joi.string().min(3).max(30).required().messages({
    "string.empty": "Username cannot be empty",
    "string.min": "Username should have a minimum length of {#limit}",
    "string.max": "Username should have a maximum length of {#limit}",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email cannot be empty",
  }),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,12}$")).required().messages({
    "string.pattern.base": "Password must be 6-12 characters long and contain only letters and numbers",
    "string.empty": "Password cannot be empty",
  }),
  createdAt: joi.date().default(Date.now),
});

const logInSchema=joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email cannot be empty",
  }),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,12}$")).required().messages({
    "string.pattern.base": "Password must be 6-12 characters long and contain only letters and numbers",
    "string.empty": "Password cannot be empty",
  })
})
module.exports={userSchema, logInSchema};