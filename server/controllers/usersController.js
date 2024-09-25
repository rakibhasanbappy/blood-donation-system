// Module Scaffolding
const usersController = {};


// Add New User
usersController.createUser = async (req, res) => {

    const {name, password, phone, district, division, blood_group, is_available, last_donated} = req.body;

    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = usersController;