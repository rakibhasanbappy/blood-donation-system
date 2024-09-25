// external imports
const { body, validationResult } = require('express-validator');
const createError = require('http-errors');



const addUserValidator = [

    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("Name must be alphabetic")
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