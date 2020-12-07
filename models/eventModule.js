const mongoose=require('mongoose');

const schemaEvent=new mongoose.Schema({
    img:{ type:String, trim:false, required:true },
    head:{type:String, trim:false, required:true},
    time:{type:String, trim:false, required:true},
    contex:{type:String, trim:false, required:true},
    status:{type:Number, trim:true, required:true},
    url:{type:String, trim:true, required:true}
},{ collection : 'event' })

module.exports=mongoose.model('Event',schemaEvent);