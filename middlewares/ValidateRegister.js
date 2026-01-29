const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


module.exports.ValidateRegistration = async (req,res,next)=>{

     const {email,
        password,
        role,
        name,
        department,
        managerId,
        TlId,
        employeeCode} = req.body;

        if((!email)||(!password)||(!role)||(!name)){
            return res.status(400).json({
                message:"EMAIL - PASSWORD - ROLE - NAME fields are require"
            })
        }

        if(!emailRegex.test(email)){
            return res.status(400).json({
                message:"Invalid email"
            })
        }

        if(!passwordRegex.test(password)){
            return res.status(400).json({
                message:"Password must be at least 8 characters and include uppercase, lowercase, number and special character"
            })
        }

        if(!["MANAGER","TL","EMPLOYEE"].includes(role)){
             return res.status(400).json({
                message:"Invalid Role"
            })
        }

        //ROLE BASED

        if(role === "MANAGER"){
            if(!department){
                return res.status(400).json({
                    message:"Department field is required for manager"
                })
            }
        }

        if(role === "TL"){
            if(!managerId){
                return res.status(400).json({
                    message:"managerId field is required for TL"
                })
            }

        if(!mongoose.Types.ObjectId.isValid(managerId)){
            return res.status(400).json({
                 message: "Invalid managerId"
             });
            }
        }

        
        if(role === "EMPLOYEE"){
            if(!TlId || !employeeCode){
                return res.status(400).json({
                    message:"TlId & employeeCode field is required for EMPLOYEE"
                })
            }

        if(!mongoose.Types.ObjectId.isValid(TlId)){
            return res.status(400).json({
                 message: "Invalid TlId"
             });
            }
        }

        next();
}

module.exports.LoginValidations = async (req,res,next)=>{

    const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"EMAIL - PASSWORD fields are require"
            })
        }

        if(!emailRegex.test(email)){
            return res.status(400).json({
                message:"Invalid email"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                message:"Password must be at least 6 characters"
            })
        }

        next();
}