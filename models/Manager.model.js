const mongoose = require('mongoose');
const schema = mongoose.Schema

const managerSchema = new schema({

    name:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true,
        default: "GENERAL"
    },
    managerCode:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

module.exports = mongoose.model("Manager",managerSchema);