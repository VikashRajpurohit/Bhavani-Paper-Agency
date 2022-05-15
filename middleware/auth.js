const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    //getusertoken
    const token = req.header("x-auth-token");

    if(!token){
        console.log("Token is not Provided");
        return res.status(401).json({msg : 'No token, provided'});
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        console.log(req.user)
        next();
    } catch (error) {
        console.log("Token is not Valid");
        res.status(401).json({msg : "Token is not Valid"});
    }
}