const mongoose=require('mongoose');

const schemaXamsa=new mongoose.Schema({
    status:{type:Number, trim:false,required:true},
    level:{type:String, trim:true, required:true},
    question:{type:String, trim:false, required:true},
    answer:{type:String, trim:true, required:true},
    clas:{type:String, trim:true, required:true}
},{ collection : 'xamsaQuestions' })

module.exports=mongoose.model('Xamsa',schemaXamsa);