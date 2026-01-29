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
    }
},{timestamps:true});

module.exports = mongoose.model("Manager",managerSchema);