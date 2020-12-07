const mongoose=require('mongoose');

const schemaWhat=new mongoose.Schema({
    status:{type:Number, trim:false,required:true},
    level:{type:String, trim:true, required:true},
    question:{type:String, trim:false, required:true},
    answer:{type:String, trim:true, required:true},
    clas:{type:String, trim:true, required:true}
},{ collection : 'whatQuestions' })

module.exports=mongoose.model('What',schemaWhat);