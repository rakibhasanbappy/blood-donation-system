// external dependencies
const router = require('express').Router();

// internal dependencies
const { get_all_requests, get_request_by_id, get_requests_by_user_id, create_request, update_request } = require('../controllers/requestsController');

const { checkLogin } = require('../middlewares/common/checkLogin');
const { addRequestValidator, addRequestValidationHandler } = require('../middlewares/common/addRequestValidator');


// routes

// get all requests
router.get("/", get_all_requests);

// get a request by id
router.get("/:id", get_request_by_id);

// get requests by user id
router.get("/user/:id", checkLogin, get_requests_by_user_id);

// create a request
router.post("/", checkLogin, addRequestValidator, addRequestValidationHandler, create_request);

// update a request
router.put("/:id", checkLogin, addRequestValidator, addRequestValidationHandler, update_request);

// export the router
module.exports = router;

