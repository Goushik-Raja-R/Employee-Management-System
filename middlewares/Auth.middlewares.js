const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.models')

module.exports.protect = async (req,res,next)=>{

    try{

        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
            }

            console.log(token);

        if(!token){
            return res.status(401).json({ message: "No token" });
        }

        const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        console.log("Server Time:", Math.floor(Date.now() / 1000));
        console.log("Token Exp :", payload.exp);


        const user = await UserModel.findById(payload.userId);

        console.log(user);

        if(!user){
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    }
    catch(error){
            console.error("JWT ERROR 👉", error.message);
            return res.status(401).json({
            message: error.message
     });
    }
}

