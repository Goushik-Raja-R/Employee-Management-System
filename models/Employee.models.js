const mongoose = require("mongoose");
const schema = mongoose.Schema;

const EmployeeSchema = new schema({
    name:{
        type:String,
        required:true
    },
    employeeCode:{
        type:String,
        unique:true,
        required:true
    },
    TlId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TL",
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    dateOfJoining:{
        type:Date,
        default:Date.now
    },
    dateOfExit: {
        type: Date,
        default: null
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const ActiveHC = mongoose.model('Employee',EmployeeSchema);

module.exports=ActiveHC;