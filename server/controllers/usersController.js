// External Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Internal Imports
const { createUser, getUserByEmail, getUserById, updateUser } = require('../services/users_operations.js');



// Module Scaffolding
const usersController = {};

// create and sign a jwt token and set cookie
function createJWTToken(userId, userEmail, userName, res){


    const token = jwt.sign(
        {userId: userId, userEmail: userEmail, userName: userName},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN,}
    );

    // set cookie
    res.cookie(process.env.COOKIE_NAME, token, {
        signed: true,
        maxAge: process.env.JWT_EXPIRES_IN,
        httpOnly: true,
    });
}


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

usersController.getLogin = async(req, res) => {

    try{
        const user = await getUserByEmail(req.body.email);

        if(user && user.length > 0){
            
            const hashedPasswordFromDb = Buffer.from(user[0].password).toString('utf8');

            const match = await bcrypt.compare(req.body.password, hashedPasswordFromDb);


            if(!match){
                res.status(500).json({
                    error: "Invalid Credentials."
                })
            }else{
                createJWTToken(user[0].uid, user[0].email, user[0].name, res);
                res.status(200).json({
                    message: "Login successful",
                });
            }

        }else{
            res.status(500).json({
                error: "Invalid Credentials."
            })
        }
    }catch{
        res.status(500).json({
            error:"Something Went Wrong!"
        })
    }


}

usersController.logout = async(req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).json({
        message: "Logout Successful"
    });
}


// get user by id
usersController.getUserById = async (req, res) => {

    if(parseInt(req.user.userId) !== parseInt(req.params.id)){
        return res.status(401).json({
            error: "Unauthorized Access"
        });
    }
    
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            error: error,
        });
    }
};

// user update
usersController.updateUser = async (req, res) => {
    
    if(parseInt(req.user.userId) !== parseInt(req.params.id)){
        return res.status(401).json({
            error: "Unauthorized Access"
        });
    }
    
    
    let updatedUser = {
        uid: req.user.userId,
        phone: req.body.phone,
        district: req.body.district,
        divison: req.body.divison,
        blood_group: req.body.blood_group,
        is_available: req.body.is_available,
        last_donated: req.body.last_donated,
    };

    try{
        const user = await updateUser(updatedUser);
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).json({
            error: error,
        });
    }
};


module.exports = usersController;