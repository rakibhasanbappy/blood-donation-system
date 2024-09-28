// external dependencies
const router = require('express').Router();

// internal dependencies
const {addUserValidator, addUserValidationHandler } = require('../middlewares/common/addUserValidator');
const { loginValidator, loginValidationHandler } = require('../middlewares/common/loginValidator');
const { createUser, getLogin, getUserById, updateUser } = require('../controllers/usersController');
const { checkLogin, redirectLoggedIn } = require('../middlewares/common/checkLogin');


// routes
// router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/create', redirectLoggedIn, addUserValidator, addUserValidationHandler, createUser);
router.post('/login', redirectLoggedIn, loginValidator, loginValidationHandler, getLogin);
router.put('/:id', checkLogin, updateUser);
// router.delete('/:id', deleteUser);

// export the router
module.exports = router;

