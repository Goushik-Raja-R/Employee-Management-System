const mongoose = require('mongoose');
const schema = mongoose.Schema

const UserSchema = new schema({

    email:{
        required:true,
        type:String,
        unique:true,
        lowercase:true
    },
    password:{
        required:true,
        type:String
    },
    role:{
        type:String,
        enum:["MANAGER","TL","EMPLOYEE"],
        required:true
    },
    refId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    roleRef:{
        type:String,
        required:true,
        enum:['Manager','Tl','Employee']
    }
},{ timestamps: true });

module.exports = mongoose.model("User",UserSchema);