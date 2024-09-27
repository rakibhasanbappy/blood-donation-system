const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkLogin = (req, res, next) => {

    const token = req.signedCookies[process.env.COOKIE_NAME];

    if(!token){
        res.status(401).json({message: 'Authorization Required'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({message: 'Unauthorized Access'});
    }
};


const redirectLoggedIn = (req, res, next) => {
    if (req.signedCookies[process.env.COOKIE_NAME]) {
      return res.redirect("/user/dashboard");
    }
    next();
};

module.exports = {
    checkLogin,
    redirectLoggedIn
};