const Tl = require('../models/Tl.model');
const UserModel = require('../models/User.models');
const jwt = require("jsonwebtoken");

module.exports.GetAllTL = async(req,res)=>{

    try{
        const data = await Tl.find();

        if(data.length === 0){
            return res.status(400).json({
                success:false,
                message:"There is no TL data in DB"
            })
        }

        return res.status(200).json({
            success:true,
            count:data.length,
            data:data
        })

    }
    catch(error){
          return res.status(400).json({
                message:"There is no TL data in DB"
            })
    }
}

module.exports.GetTLbyID = async(req,res)=>{

    try{

       const UserID_of_Manager = req.user._id;

       const userdata = await UserModel.findById(UserID_of_Manager);

       const Tls = await Tl.find({managerId:userdata.refId});

       if(Tls.length === 0){
             return res.status(400).json({
                success:false,
                message:`There is No TL Working under ${userdata.name}`
             })
       }

       return res.status(200).json({
            success:true,
            count:Tls.length,
            data:Tls
       })

    }catch(error){
        return res.status(400).json({
            success:false,
            error:error.message
        })

    }
}

module.exports.UpdateTlBYManagerID = async(req,res)=>{

    try{

        const {refId:Manager_ID} = await UserModel.findById(req.user._id);
        const {tlCode} = req.body;

        const TlUser = await Tl.findOne({
            tlCode:tlCode,
            managerId:Manager_ID,
        })

        if(!TlUser){
            return res.status(400).json({
                success:false,
                message:`There is no TL in Database with this ${tlCode} TLcode`
            })
        }

        const UpdateTL = await Tl.findOneAndUpdate({tlCode:tlCode,managerId:Manager_ID},req.body,
            {
                new:true,
                runValidators:true
            }
        )

        return res.status(200).json({
            success:true,
            message: `${tlCode} updated successfully`,
            data: UpdateTL
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            error:error.message
        })
    }
}


module.exports.DeleteTlByManagerID = async(req,res)=>{

    try{

        const {refId:Manager_ID} = await UserModel.findById(req.user._id);
        const {tlCode} = req.body;

        const DeleteTL = await Tl.findOneAndDelete({managerId:Manager_ID,tlCode:tlCode});
        const DeletTLFromUser = await UserModel.findOneAndDelete({refId:DeleteTL._id})

        if(!DeleteTL){
            return res.status(400).json({
                success:false,
                message:`The TL with ${tlCode} is not exist in TL Database`
            })
        }

        if(!DeletTLFromUser){
            return res.status(400).json({
                success:false,
                message:`The TL with ${tlCode} is not exist in User database`
            })
        }

        return res.status(200).json({
            success:true,
            message: `${tlCode} deleted successfully`
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error Ocuured during Deletion",
            error:error.message
        })
    }
}