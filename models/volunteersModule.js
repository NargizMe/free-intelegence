const mongoose=require('mongoose');

const schemaVolunteer=new mongoose.Schema({
    status:{type:Number, trim:false,required:true},
    name:{type:String, trim:false, required:true},
    surname:{type:String, trim:false, required:true},
    number:{type:String, trim:true, required:true},
    email:{type:String, trim:false, required:true}
},{ collection : 'volunteer' })

module.exports=mongoose.model('Volunteer',schemaVolunteer);