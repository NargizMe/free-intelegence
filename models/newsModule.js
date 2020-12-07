const mongoose=require('mongoose');

const schemaNews=new mongoose.Schema({
    img:{ type:String, trim:false, required:true },
    date:{type:String, trim:false, required:true},
    head:{type:String, trim:false, required:true},
    contex:{type:String, trim:false, required:true},
    hideContex:{type:String, trim:false, required:true},
    direction:{type:String, trim:true, required:true},
    status:{type:Number, trim:false, required:true}
},{ collection : 'news' })

module.exports=mongoose.model('News',schemaNews);