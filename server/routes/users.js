// external dependencies
const router = require('express').Router();

// internal dependencies
const {addUserValidator, addUserValidationHandler } = require('../middlewares/common/addUserValidator');
const { loginValidator, loginValidationHandler } = require('../middlewares/common/loginValidator');
const { createUser, getLogin } = require('../controllers/usersController');


// routes
// router.get('/', getAllUsers);
// router.get('/:id', getUser);
router.post('/create', addUserValidator, addUserValidationHandler, createUser);
router.post('/login', loginValidator, loginValidationHandler, getLogin);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

// export the router
module.exports = router;

