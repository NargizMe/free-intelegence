const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const routers=require('./routers/routers');
const routersMail=require('./routers/sendMail');

const app=express();

app.set('view engine','ejs');
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cors({ dest: `./uploads/`,
    rename: function (fieldname, filename) {
      return filename;
    },
   }));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost/Intelegence',{
  useNewUrlParser: true,
  useUnifiedTopology: true
},()=>{ 
console.log('Mongoose connected');
})

app.use("/api", routers);
app.use("/mail", routersMail);

app.get('/admin',(req,res)=>{
    res.render('admin');
})

app.get('/adminMain',(req,res)=>{
    res.render('adminMain');
})

app.get('/news',(req,res)=>{
    res.render('news');
})

app.get('/game',(req,res)=>{
    res.render('game');
})

app.get('/admin/volunteers',(req,res)=>{
    res.render('volunteers');
})

app.get('/admin/gamers',(req,res)=>{
    res.render('gamers');
})

app.get('/admin/xamsa',(req,res)=>{
    res.render('xamsa');
})

app.get('/admin/brainRing',(req,res)=>{
    res.render('brainRing');
})

app.get('/admin/what',(req,res)=>{
    res.render('what');
})

app.get('/admin/clever',(req,res)=>{
    res.render('clever');
})

app.get('/',(req,res)=>{
    res.render('index');
})
const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Server started on ${port}`);
})