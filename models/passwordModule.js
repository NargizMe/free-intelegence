const mongoose=require('mongoose');

const schemaPassword=new mongoose.Schema({
    user:{type:String, trim:false, required:true},
    password:{type:String, trim:false, required:true},
    status:{type:Number, trim:false, required:true}
},{ collection : 'password' })

module.exports=mongoose.model('Password',schemaPassword);