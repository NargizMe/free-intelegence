const mongoose=require('mongoose');

const schemaAbout=new mongoose.Schema({
    img:{ type:String, trim:false, required:true },
    contex:{type:String, trim:false, required:true},
    direction:{type:String, trim:true, required:true},
    name:{type:String, trim:false, required:true},
    job:{type:String, trim:false, required:true},
    status:{type:Number, trim:true, required:true}
},{ collection : 'about' })

module.exports=mongoose.model('About',schemaAbout);