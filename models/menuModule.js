const mongoose=require('mongoose');

const schemaMenu=new mongoose.Schema({
    name:{type:String, trim:true, required:true},
    url:{type:String, trim:true, required:true},
    status:{type:Number, trim:true, required:true}
},{ collection : 'menu' })

module.exports=mongoose.model('Menu',schemaMenu);