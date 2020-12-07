const mongoose=require('mongoose');

const schemaSign=new mongoose.Schema({
    name:{type:String, trim:true, required:true},
    gender:{type:String, trim:true, required:true},
    region:{type:String, trim:true, required:true},
    date:{type:String, trim:true, required:true},
    number:{type:String, trim:true, required:true},
    email:{type:String, trim:true, required:true},
    password:{type:String, trim:false, required:true},
    where:{type:String, trim:false, required:true},
    status:{type:Number, trim:true, required:true}
},{ collection : 'sign' })

module.exports=mongoose.model('Sign',schemaSign);