// external dependencies
const router = require('express').Router();

// internal dependencies
const {addUserValidationHandler } = require('../middlewares/common/userValidator');
const { createUser } = require('../controllers/usersController');


// routes
// router.get('/', getAllUsers);
// router.get('/:id', getUser);
router.post('/create', addUserValidationHandler, createUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

// export the router
module.exports = router;

