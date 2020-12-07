const mongoose=require('mongoose');

const schemaProject=new mongoose.Schema({
    img:{ type:String, trim:false, required:true },
    status:{type:Number, trim:false,required:true},
    head:{type:String, trim:false, required:true},
    time:{type:String, trim:false, required:true},
    place:{type:String, trim:false, required:true},
    support:{type:String, trim:false, required:true},
    hideContex:{type:String, trim:false, required:true}
},{ collection : 'project' })

module.exports=mongoose.model('Project',schemaProject);