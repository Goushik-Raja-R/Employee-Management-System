const mongoose = require('mongoose');
const schema = mongoose.Schema

const TlSchema = new schema({

    name:{
        type:String,
        required:true
    },
    managerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Manager",
        required:true
    },
    tlCode:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    teamName:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

module.exports = mongoose.model("TL",TlSchema);

