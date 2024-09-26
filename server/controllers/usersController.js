// External Imports
const bcrypt = require('bcrypt');

// Internal Imports
const { createUser } = require('../services/users_operations.js');



// Module Scaffolding
const usersController = {};


// Add New User
usersController.createUser = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        divison: req.body.divison,
        district: req.body.district,
        blood_group: req.body.blood_group,
        is_available: req.body.is_available,
        last_donated: req.body.last_donated,
    };

    try {
        const username = await createUser(newUser);
        res.status(201).json(username);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = usersController;