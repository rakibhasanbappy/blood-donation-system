const { get_all_requests, get_request_by_id, get_requests_by_user_id, create_request, update_request } = require('../services/requests_operations');


// Module Sacffolding
const requestsController = {};


// get all requests
requestsController.get_all_requests = async (req, res) => {
    try{
        const requests = await get_all_requests();
        res.json(requests);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}

// get a request by id
requestsController.get_request_by_id = async (req, res) => {
    const { id } = req.params;
    try{
        const request = await get_request_by_id(id);
        if(request.length === 0){
            return res.status(404).json({error: 'Request not found'});
        }
        res.json(request);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}

// get requests by user id
requestsController.get_requests_by_user_id = async (req, res) => {
    if(parseInt(req.user.userId) !== parseInt(req.params.id)){
        return res.status(403).json({error: 'You are not allowed to access this route'});
    }
    const uid = req.user.userId;
    try{
        const requests = await get_requests_by_user_id(uid);
        res.json(requests);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}

// create a request
requestsController.create_request = async (req, res) => {
    const request = {
        uid: req.user.userId,
        name: req.body.name,
        phone: req.body.phone,
        blood_group: req.body.blood_group,
        district: req.body.district,
        divison: req.body.divison,
        address: req.body.address,
        message: req.body.message,
    }

    try{
        const new_request = await create_request(request);
        res.json(new_request);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}

// update a request
requestsController.update_request = async (req, res) => {

    const { id } = req.params;

    try{
        const request = await get_request_by_id(id);
        if(request.length === 0){
            return res.status(404).json({error: 'Request not found'});
        }
        if(request[0].uid !== req.user.userId){
            return res.status(403).json({error: 'You are not allowed to update this request'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
        return;
    }

    const request = {
        name: req.body.name,
        phone: req.body.phone,
        blood_group: req.body.blood_group,
        district: req.body.district,
        divison: req.body.divison,
        address: req.body.address,
        message: req.body.message,
        request_id: id
    }

    try{
        const updated_request = await update_request(request);
        console.log(updated_request);
        res.json(updated_request);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}

// export module
module.exports = requestsController;