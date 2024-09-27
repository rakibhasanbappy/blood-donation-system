// external imports
const { body, validationResult } = require("express-validator");

const loginValidator = [
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is invalid."),

    body("password")
    .notEmpty()
    .withMessage("Password is required"),
]

const loginValidationHandler = function(req, res, next){
     const errors = validationResult(req);
     const mappedErrors = errors.mapped();

     if(Object.keys(mappedErrors).length === 0){
        next();
     }else{
        res.status(400).json({
            errors: mappedErrors,
        })
     }
}

module.exports = {
    loginValidator,
    loginValidationHandler
}