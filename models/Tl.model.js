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
    }
},{timestamps:true});

module.exports = mongoose.model("TL",TlSchema);