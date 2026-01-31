const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.models')

module.exports.protect = async (req,res,next)=>{

    try{
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const token = authHeader.split(" ")[1];

        console.log(token);


        if(!token){
            return res.status(401).json({ message: "No token" });
        }

        const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        if(!payload.userId){
            return res.status(401).json({
                message:"Invalid token payload"
            })
        }

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

