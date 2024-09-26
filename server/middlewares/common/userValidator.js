// external imports
const { body, validationResult } = require('express-validator');
const createError = require('http-errors');


// register new user
const addUserValidator = [

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error('A user already exists with this e-mail address');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("Name must be alphabetic"),

    body("password")
    .isStrongPassword()
    .withMessage("Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"),

    body("phone")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Phone number must be a valid Bangladeshi mobile number"),

    body("blood_group")
    .trim()
    .notEmpty()
    .withMessage("Blood Group is required")
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid Blood Group"),

    body("is_available")
    .isBoolean()
    .withMessage("Availability status must be a boolean value"),

    body("last_donated")
    .optional()
    .isDate()
    .withMessage("Last donated date must be a valid date"),

];

const addUserValidationHandler = function (req, res, next) {

    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
      next();
    } else {
      res.status(400).json({ errors: mappedErrors });
    }
  };
  
  /*
  mappedErrors = {
    name: {
      msg:"Invalid value",
    },
    email: {
      msg:"Invalid value",
    },
  }
  */
  
  module.exports = {
    addUserValidator,
    addUserValidationHandler,
  };