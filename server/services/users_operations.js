const get_client = require('./get_client');

// create a new user
async function createUser(newUser){
    const query = {
        text: 'INSERT INTO users (email, name, password, phone, district, divison, blood_group, is_available, last_donated ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        values: [newUser.email, newUser.name, newUser.password, newUser.phone, newUser.district, newUser.divison, newUser.blood_group, newUser.is_available, newUser.last_donated]
    }
    try{
        const client = await get_client();
        const { rows } = await client.query(query);
        client.end();
        return rows[0].name;
    } catch (error){
        console.log(error);
        return error;
    }
}

// get user by email
async function getUserByEmail(email){
    const query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
    }
    try{
        const client = await get_client();
        const { rows } = await client.query(query);
        client.end();
        return rows;
    } catch (error){
        console.log(error);
        return error;
    }
}

module.exports = {
    createUser,
    getUserByEmail
}