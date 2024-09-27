// external dependencies
const router = require('express').Router();

// internal dependencies
const {addUserValidator, addUserValidationHandler } = require('../middlewares/common/addUserValidator');
const { createUser } = require('../controllers/usersController');


// routes
// router.get('/', getAllUsers);
// router.get('/:id', getUser);
router.post('/create', addUserValidator, addUserValidationHandler, createUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

// export the router
module.exports = router;

