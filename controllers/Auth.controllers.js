const Manager = require('../models/Manager.model');
const Tl = require('../models/Tl.model');
const Employee = require('../models/Employee.models');
const User = require('../models/User.models');
const RefreshToken = require('../models/RefreshToken.models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.RegisterUser = async(req,res)=>{

    try{

    const{ email,password,role,name} = req.body;

    const ExistingUser = await User.findOne({email});

    if(ExistingUser){
        return res.status(400).json(
            {message:"User already exists"})
    }

    //RoleCheck

    let roleDoc;

    if(role === "MANAGER"){
        const {department} = req.body;
        roleDoc = await Manager.create({name:name,department});
    }else if(role === "TL"){
        const {managerId} = req.body;
        roleDoc = await Tl.create({name:name,managerId});
    }else if(role === "EMPLOYEE"){
        const {TlId,employeeCode} = req.body;
        roleDoc = await Employee.create({name:name,TlId,employeeCode});
    }else{
        return res.status(400).json(
            {message:"Invalid role"})
    }

    //hasing password
    const HashPassword = await bcrypt.hash(password,10);

    //Create user doc
    await User.create({
        email:email,
        password:HashPassword,
        role:role,
        refId:roleDoc._id
    })

    return res.status(201).json(
        {Message:"User Created Successfully"})
    }

    catch(error){
        res.status(500).json({
            message:"Registration Failed",
            error:error.message
        })
    }
}

module.exports.LoginUser = async(req,res)=>{
    try{

        const {email,password} = req.body;

        const user = await User.findOne({email}).populate("refId");

        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                message:"Invalid Password"
            })
        }

        const accesstoken = jwt.sign(
            {
            userId:user._id.toString(),
            role:user.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "10m"}
        );

        const refreshtoken = jwt.sign(
            {
            userId:user._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"7d"}
        );

        await RefreshToken.create({
            userId:user._id,
            token:refreshtoken,
            expiresAt:new Date(Date.now()+7*24*60*60*1000)
        })

        res.cookie("refreshtoken",refreshtoken,
        {
            httpOnly:true,
            sameSite:"strict"
        });

        res.status(200).json({
            message:"login successfully",
            accesstoken,
            data:{
                id:user._id,
                email:user.email,
                role:user.role,
                profile:user.refId
            }
        })

    }catch(error){
            res.status(500).json({
                message:"Login Failed",
                error:error.message
            })
    }
}

module.exports.Refresh = async(req,res)=>{

    try{

        const token = req.cookies.refreshtoken;

        if(!token){
            return res.status(401).json({
                message:"No refresh token"
            })
        }

        const payload = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);

        const StoredToken = await RefreshToken.findOne({token});
        
        if(!StoredToken || StoredToken.isRevoked){
            return res.status(401).json({
                message:"Invalid Refresh token"
            })
        }

        const newAccessToken = jwt.sign(
            {
                userId:payload.userId
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
        )

        return res.json({"AccessToken":newAccessToken});

    }catch(error){
        return res.status(401).json({
            message:"Token expired or Invalid"
        })
    }
}


module.exports.Logout = async(req,res)=>{

    try{

        const token = req.cookies.refreshtoken;

        if(!token){
            return res.status(401).json({
                message:"No refresh token"
            })
        }

        const storedtoken = await RefreshToken.findOne({token});

        console.log(storedtoken.isRevoked);

        if(storedtoken){
            storedtoken.isRevoked = true,
            await storedtoken.save();
        }

        console.log(storedtoken.isRevoked);

        res.clearCookie("refreshtoken",
            {
                httpOnly: true,
                sameSite: "strict"
            })

        return res.status(200).json({
            success:true,
            message:"User Logout Successfully"
        })

    }
    catch(error){
        return res.status(401),json({
            message: "Logout failed",
            error: error.message
        })
    }

}