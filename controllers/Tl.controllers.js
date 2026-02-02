const { json } = require('body-parser');
const Tl = require('../models/Tl.model');

module.exports.GetAllTL = async(req,res)=>{

    try{
        const data = await Tl.find();

        if(!data){
            return res.status(400).json({
                success:false,
                message:"There is no TL data in DB"
            })
        }

        return res.status(200),json({
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