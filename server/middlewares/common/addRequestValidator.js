// external imports
const { body, validationResult } = require('express-validator');



// register new user
const addRequestValidator = [

    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must be alphabetic"),


    body("phone")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Phone number must be a valid Bangladeshi mobile number"),

    body("district")
    .optional()
    .trim()
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("District must be alphabetic"),

    body("division")
    .optional()
    .trim()
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("Division must be alphabetic"),

    body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required"),

    body("blood_group")
    .trim()
    .notEmpty()
    .withMessage("Blood Group is required")
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid Blood Group"),
];

const addRequestValidationHandler = function (req, res, next) {

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
    addRequestValidator,
    addRequestValidationHandler,
  };