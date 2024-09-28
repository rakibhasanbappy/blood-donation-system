const get_client = require('../services/db_client');


// get all requests
const get_all_requests = async () => {
    
    const query = {
        text: 'SELECT * FROM requests'
    }

    try{
        const client = get_client();
        const { rows } = await client.query(query);
        await client.end();
        return rows;
    }catch(err){
        console.log(err);
        return err;
    }
};

// get a request by id
const get_request_by_id = async (id) => {
    const query = {
        text: 'SELECT * FROM requests WHERE request_id = $1',
        values: [id]
    }

    try{
        const client = get_client();
        const { rows } = await client.query(query);
        await client.end();
        return rows;
    }catch(err){
        console.log(err);
        return err;
    }
};

// get requests by user id
const get_requests_by_user_id = async (id) => {
    const query = {
        text: 'SELECT * FROM requests WHERE uid = $1',
        values: [id]
    }

    try{
        const client = get_client();
        const { rows } = await client.query(query);
        await client.end();
        return rows;
    }catch(err){
        console.log(err);
        return err;
    }
};

// create a request
const create_request = async (request) => {
    const query = {
        text: 'INSERT INTO requests (name, phone, district, divison, address, message, blood_group, uid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        values: [request.name, request.phone, request.district, request.divison, request.address, request.message, request.blood_group, request.uid]
    }

    try{
        const client = get_client();
        const { rows } = await client.query(query);
        await client.end();
        return rows;
    }catch(err){
        console.log(err);
        return err;
    }
};

// update a request
const update_request = async (request) => {
    const query = {
        text: 'UPDATE requests SET name = $1, phone = $2, district = $3, divison = $4, address = $5, message = $6, blood_group = $7 WHERE request_id = $8 RETURNING *',
        values: [request.name, request.phone, request.district, request.divison, request.address, request.message, request.blood_group, request.request_id]
    }

    try{
        const client = get_client();
        const { rows } = await client.query(query);
        await client.end();
        return rows;
    }catch(err){
        console.log(err);
        return err;
    }
};

module.exports = {
    get_all_requests,
    get_request_by_id,
    get_requests_by_user_id,
    create_request,
    update_request
};