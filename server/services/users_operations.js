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
        await client.end();
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
        await client.end();
        return rows;
    } catch (error){
        console.log(error);
        return error;
    }
}

// get user by id
async function getUserById(id){
    const query = {
        text: 'SELECT * FROM users WHERE uid = $1',
        values: [id]
    }
    try{
        const client = await get_client();
        const { rows } = await client.query(query);
        await client.end();
        return rows;
    } catch (error){
        console.log(error);
        return error;
    }
}

// update user
async function updateUser(updatedUser){
    const query = {
        text: 'UPDATE users SET phone = $1, district = $2, divison = $3, blood_group = $4, is_available = $5, last_donated = $6 WHERE uid = $7 RETURNING *',
        values: [updatedUser.phone, updatedUser.district, updatedUser.divison, updatedUser.blood_group, updatedUser.is_available, updatedUser.last_donated, updatedUser.uid]
    }
    try{
        const client = await get_client();
        const { rows } = await client.query(query);
        await client.end();
        return rows;
    } catch (error){
        console.log(error);
        return error;
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUser
}