const express=require('express');
const Password=require('../models/passwordModule');
const Menu=require('../models/menuModule');
const Project=require('../models/projectsModule');
const About=require('../models/aboutModule');
const Event=require('../models/eventModule');
const News=require('../models/newsModule');
const Volunteer=require('../models/volunteersModule');
const Sign=require('../models/signModule');
const Xamsa=require('../models/xamsaModule');
const BrainRing=require('../models/brainRingModule');
const What=require('../models/whatModule');
const Clever=require('../models/cleverModule');
// const multer=require('multer');
// const upload=multer({dest:'uploads/'});
require('dotenv').config();
const nodemailer = require("nodemailer");
const router=express.Router();
// const fs = require("fs");

// ----------------------------MENU ----------------------------
router.get("/get-menu", async (req, res) => {
  
  const menu = await Menu.find({});  
  
  if (menu.length !== 0) {
    return res.status(200).json({ menu })
  }
  res.status(434).json({ menu: "Hech bir malumat tapilmadi" });
  
})


// ----------------------------- PROJECTS ----------------------------
router.get("/get-project", async (req, res) => {
  
  const projects = await Project.find({});
  
  if (projects.length !== 0) {
    return res.status(200).json({ projects })
  }
  res.status(434).json({ projects: "Hech bir malumat tapilmadi" });
    
})

router.get("/get-project/:head", async (req, res) => {

  const { head } = req.params;

  const project = await Project.findOne({ head: head });
  
  if (Object.keys(project).length !== 0) {
    return res.status(200).json({ project })
  }

  res.status(434).json({ project: "Hech bir malumat tapilmadi" });  
    
})
  
router.post('/add-project',async (req,res)=>{
const { head, time, status, hideContex, place, support, img } = req.body;

const project = new Project({
  head, time, status, hideContex, place, support, img
})

project
  .save()
  .then(data => {
    // geriye front end-e gonderecem
    res.status(200).json({ projectData: data })
  })
  .catch(err => {
    console.log('error', err)
  }) 
})

router.put("/change-project/:id", async (req, res) => {
  const { id } = req.params;
  const { head, time, hideContex, place, support, img } = req.body;
  
  if (head.length!==0) {
    Project.findByIdAndUpdate(
      { _id: id }, 
      { $set: { head } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ project: "project not found." })
        } else {
          res.status(200).json({ project: result })
        }
    });
  }
  else if (time.length!==0) {
    Project.findByIdAndUpdate(
      { _id: id }, 
      { $set: { time } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ project: "project not found." })
        } else {
          res.status(200).json({ project: result })
        }
    });
  } 
  else if (hideContex.length!==0) {
    Project.findByIdAndUpdate(
      { _id: id }, 
      { $set: { hideContex } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ project: "project not found." })
        } else {
          res.status(200).json({ project: result })
        }
    });
  }
  else if (place.length!==0) {
    Project.findByIdAndUpdate(
      { _id: id }, 
      { $set: { place } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ project: "project not found." })
        } else {
          res.status(200).json({ project: result })
        }
    });
  }
  else if (support.length!==0) {
    Project.findByIdAndUpdate(
      { _id: id }, 
      { $set: { support } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ project: "project not found." })
        } else {
          res.status(200).json({ project: result })
        }
    });
  }
  else if (img.length!==0) {
    Project.findByIdAndUpdate(
      { _id: id }, 
      { $set: { img } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ project: "project not found." })
        } else {
          res.status(200).json({ project: result })
        }
    });
  }
  else {
    res.status(302).json({ project: "Data is null or undefined." })
  }
})

router.post('/delete-project',async (req,res)=>{
  const { status, head } = req.body;

  const about = Project.findOneAndUpdate({head: head}, { status: status }, {new:true}, function(err, payload) {
  if (err) console.log(err)
  return res.status(200).json({ payload: payload })
  })
})

// ------------------------------- ABOUT ---------------------------------
router.get("/get-about", async (req, res) => {
  
  const about = await About.find({});
  
  
  if (about.length !== 0) {
    return res.status(200).json({ about })
  }
  res.status(434).json({ about: "Hech bir malumat tapilmadi" });
    
})
  
router.post('/add-about',async (req,res)=>{
  const { img, contex, direction, status, job, name } = req.body;

  const about = new About({
    img, contex, direction, status, job, name
})

about
  .save()
  .then(data => {
    // geriye front end-e gonderecem
    res.status(200).json({ aboutData: data })
  })
  .catch(err => {
    console.log('error', err)
  }) 
})

router.post('/delete-about',async (req,res)=>{
  const { status, name } = req.body;

  About.findOneAndUpdate({name: name}, { status: status }, {new:true}, function(err, payload) {
  if (err) console.log(err)
  return res.status(200).json({ payload: payload })
  })
})

router.get("/get-about/:name", async (req, res) => {

  const { name } = req.params;

  const about = await About.findOne({ name: name });
  
  if (Object.keys(about).length !== 0) {
    return res.status(200).json({ about })
  }

  res.status(434).json({ about: "Hech bir malumat tapilmadi" });  
  
})

router.put("/change-about/:id", async (req, res) => {
  const { id } = req.params;
  const { img, contex, job, name } = req.body;
  
  if (name.length!==0) {
    About.findByIdAndUpdate(
      { _id: id }, 
      { $set: { name } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ about: "about not found." })
        } else {
          res.status(200).json({ about: result })
        }
    });
  }
  else if (job.length!==0) {
    About.findByIdAndUpdate(
      { _id: id }, 
      { $set: { job } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ about: "about not found." })
        } else {
          res.status(200).json({ about: result })
        }
    });
  } 
  else if (contex.length!==0) {
    About.findByIdAndUpdate(
      { _id: id }, 
      { $set: { contex } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ about: "about not found." })
        } else {
          res.status(200).json({ about: result })
        }
    });
  }
  else if (img.length!==0) {
    About.findByIdAndUpdate(
      { _id: id }, 
      { $set: { img } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ about: "about not found." })
        } else {
          res.status(200).json({ about: result })
        }
    });
  }
  else {
    res.status(302).json({ about: "Data is null or undefined." })
  }
})

// ------------------------------- EVENT ---------------------------------
router.get("/get-event", async (req, res) => {
  
  const event = await Event.find({});
  
  if (event.length !== 0) {
    return res.status(200).json({ event })
  }
  res.status(434).json({ event: "Hech bir malumat tapilmadi" });
    
})
  
router.post('/add-event',async (req,res)=>{
  const {  img, head, contex, time, status, url } = req.body;

  const event = new Event({
    img, status, head, contex, time, url
})

event
  .save()
  .then(data => {
    // geriye front end-e gonderecem
    res.status(200).json({ eventData: data })
  })
  .catch(err => {
    console.log('error', err)
  }) 
})

router.post('/delete-event',async (req,res)=>{
  const { status, head } = req.body;

  Event.findOneAndUpdate({head: head}, { status: status }, {new:true}, function(err, payload) {
  if (err) console.log(err)
  return res.status(200).json({ payload: payload })
  })
})

router.get("/get-event/:head", async (req, res) => {

  const { head } = req.params;

  const event = await Event.findOne({ head: head });
  
  if (Object.keys(event).length !== 0) {
    return res.status(200).json({ event })
  }

  res.status(434).json({ event: "Hech bir malumat tapilmadi" });  
  
})

router.put("/change-event/:id", async (req, res) => {
  const { id } = req.params;
  const { img, head, contex, time } = req.body;
  
  if (head.length!==0) {
    Event.findByIdAndUpdate(
      { _id: id }, 
      { $set: { head } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ event: "event not found." })
        } else {
          res.status(200).json({ event: result })
        }
    });
  }
  else if (time.length!==0) {
    Event.findByIdAndUpdate(
      { _id: id }, 
      { $set: { time } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ event: "event not found." })
        } else {
          res.status(200).json({ event: result })
        }
    });
  } 
  else if (contex.length!==0) {
    Event.findByIdAndUpdate(
      { _id: id }, 
      { $set: { contex } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ event: "event not found." })
        } else {
          res.status(200).json({ event: result })
        }
    });
  }
  else if (img.length!==0) {
    Event.findByIdAndUpdate(
      { _id: id }, 
      { $set: { img } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ event: "event not found." })
        } else {
          res.status(200).json({ event: result })
        }
    });
  }
  else {
    res.status(302).json({ event: "Data is null or undefined." })
  }
})

// ------------------------------- NEWS ---------------------------------
router.get("/get-news", async (req, res) => {
  
  const news = await News.find({});
  
  if (news.length !== 0) {
    return res.status(200).json({ news })
  }
  res.status(434).json({ news: "Hech bir malumat tapilmadi" });
    
})
  
router.post('/add-news',async (req,res)=>{
  const {  img, head, date, contex, direction, status, hideContex } = req.body;

  const news = new News({
    img, head, date, contex, direction, status, hideContex
})

news
  .save()
  .then(data => {
    // geriye front end-e gonderecem
    res.status(200).json({ newsData: data })
  })
  .catch(err => {
    console.log('error', err)
  }) 
})

router.post('/delete-news',async (req,res)=>{
  const { status, head } = req.body;

  News.findOneAndUpdate({head: head}, { status: status }, {new:true}, function(err, payload) {
  if (err) console.log(err)
  return res.status(200).json({ payload: payload })
  })
})

router.get("/get-news/:head", async (req, res) => {

  const { head } = req.params;

  const news = await News.findOne({ head: head });
  
  if (Object.keys(news).length !== 0) {
    return res.status(200).json({ news })
  }

  res.status(434).json({ news: "Hech bir malumat tapilmadi" });  
  
})

router.put("/change-news/:id", async (req, res) => {
  const { id } = req.params;
  const { img, head, date, contex, hideContex } = req.body;
  
  if (head.length!==0) {
    News.findByIdAndUpdate(
      { _id: id }, 
      { $set: { head } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ news: "project not found." })
        } else {
          res.status(200).json({ news: result })
        }
    });
  }
  else if (date.length!==0) {
    News.findByIdAndUpdate(
      { _id: id }, 
      { $set: { date } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ news: "project not found." })
        } else {
          res.status(200).json({ news: result })
        }
    });
  } 
  else if (hideContex.length!==0) {
    News.findByIdAndUpdate(
      { _id: id }, 
      { $set: { hideContex } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ news: "project not found." })
        } else {
          res.status(200).json({ news: result })
        }
    });
  }
  else if (contex.length!==0) {
    News.findByIdAndUpdate(
      { _id: id }, 
      { $set: { contex } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ news: "project not found." })
        } else {
          res.status(200).json({ news: result })
        }
    });
  }
  else if (img.length!==0) {
    News.findByIdAndUpdate(
      { _id: id }, 
      { $set: { img } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ news: "project not found." })
        } else {
          res.status(200).json({ news: result })
        }
    });
  }
  else {
    res.status(302).json({ news: "Data is null or undefined." })
  }
})

// ------------------------------- VOLUNTEER ---------------------------------
router.get("/get-volunteer", async (req, res) => {
  
  const volunteer = await Volunteer.find({});
  
  
  if (volunteer.length !== 0) {
    return res.status(200).json({ volunteer })
  }
  res.status(434).json({ volunteer: "Hech bir malumat tapilmadi" });
    
})
  
router.post('/add-volunteer',async (req,res)=>{
  const {  name, surname, number, email, status } = req.body;

  const volunteer = new Volunteer({
    name, surname, number, email, status
})

volunteer
  .save()
  .then(data => {
    // geriye front end-e gonderecem
    res.status(200).json({ volunteerData: data })
  })
  .catch(err => {
    console.log('error', err)
  }) 
})

router.post('/delete-volunteer',async (req,res)=>{
  const { status, id } = req.body;
  
  Volunteer.findOneAndUpdate({_id: id}, { status: status }, {new:true}, function(err, payload) {
  if (err) console.log(err)
  return res.status(200).json({ payload: payload })
  })
})

// ------------------------------- SIGNIN ---------------------------------
router.get("/get-sign", async (req, res) => {
  
  const sign = await Sign.find({});
  
  
  if (sign.length !== 0) {
    return res.status(200).json({ sign })
  }
  res.status(434).json({ sign: "Hech bir malumat tapilmadi" });
    
})
  
router.post('/add-sign',async (req,res)=>{
  const {  name, gender, region, date, number, email, password, where, status } = req.body;

  const sign = new Sign({
    name, gender, region, date, number, email, password, where, status
})

sign
  .save()
  .then(data => {
    // geriye front end-e gonderecem
    res.status(200).json({ signData: data })
  })
  .catch(err => {
    console.log('error', err)
  }) 
})

router.post('/delete-sign',async (req,res)=>{
  const { status, id } = req.body;
  
  Sign.findOneAndUpdate({_id: id}, { status: status }, {new:true}, function(err, payload) {
  if (err) console.log(err)
  return res.status(200).json({ payload: payload })
  })
})

// ------------------------------- Xamsa ---------------------------------
router.get("/get-xamsa", async (req, res) => {
  
  const xamsa = await Xamsa.find({});
  
  if (xamsa.length !== 0) {
    return res.status(200).json({ xamsa })
  }
  res.status(434).json({ xamsa: "Hech bir malumat tapilmadi" });
    
})
  
router.post('/add-xamsa',async (req,res)=>{
  const {  status, level, question, answer, clas } = req.body;

  const xamsa = new Xamsa({
    status, level, question, answer, clas
})

xamsa
  .save()
  .then(data => {
    // geriye front end-e gonderecem
    res.status(200).json({ xamsaData: data })
  })
  .catch(err => {
    console.log('error', err)
  }) 
})

router.post('/delete-xamsa',async (req,res)=>{
  const { status, id } = req.body;
  
  Xamsa.findOneAndUpdate({_id: id}, { status: status }, {new:true}, function(err, payload) {
  if (err) console.log(err)
  return res.status(200).json({ payload: payload })
  })
})

router.put("/change-xamsa/:id", async (req, res) => {
  const { id } = req.params;
  const { question, answer, level } = req.body;
  
  if (question.length!==0) {
    Xamsa.findByIdAndUpdate(
      { _id: id }, 
      { $set: { question } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  }
  else if (answer.length!==0) {
    Xamsa.findByIdAndUpdate(
      { _id: id }, 
      { $set: { answer } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  } 
  else if (level.length!==0) {
    Xamsa.findByIdAndUpdate(
      { _id: id }, 
      { $set: { level } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  }
  else {
    res.status(302).json({ question: "Data is null or undefined." })
  }
})

// ------------------------------- BRAIN-RING ---------------------------------
router.get("/get-brainRing", async (req, res) => {
  
  const brainRing = await BrainRing.find({});
  
  if (brainRing.length !== 0) {
    return res.status(200).json({ brainRing })
  }
  res.status(434).json({ brainRing: "Hech bir malumat tapilmadi" });
    
})
  
router.post('/add-brainRing',async (req,res)=>{
  const {  status, level, question, answer, clas } = req.body;

  const brainRing = new BrainRing({
    status, level, question, answer, clas
})

brainRing
  .save()
  .then(data => {
    // geriye front end-e gonderecem
    res.status(200).json({ brainRingData: data })
  })
  .catch(err => {
    console.log('error', err)
  }) 
})

router.post('/delete-brainRing',async (req,res)=>{
  const { status, id } = req.body;
  
  BrainRing.findOneAndUpdate({_id: id}, { status: status }, {new:true}, function(err, payload) {
  if (err) console.log(err)
  return res.status(200).json({ payload: payload })
  })
})

router.put("/change-brainRing/:id", async (req, res) => {
  const { id } = req.params;
  const { question, answer, level } = req.body;
  
  if (question.length!==0) {
    BrainRing.findByIdAndUpdate(
      { _id: id }, 
      { $set: { question } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  }
  else if (answer.length!==0) {
    BrainRing.findByIdAndUpdate(
      { _id: id }, 
      { $set: { answer } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  } 
  else if (level.length!==0) {
    BrainRing.findByIdAndUpdate(
      { _id: id }, 
      { $set: { level } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  }
  else {
    res.status(302).json({ question: "Data is null or undefined." })
  }
})

// ------------------------------- WHAT ---------------------------------
router.get("/get-what", async (req, res) => {
  
  const what = await What.find({});
  
  if (what.length !== 0) {
    return res.status(200).json({ what })
  }
  res.status(434).json({ what: "Hech bir malumat tapilmadi" });
    
})
  
router.post('/add-what',async (req,res)=>{
  const {  status, level, question, answer, clas } = req.body;

  const what = new What({
    status, level, question, answer, clas
})

what
  .save()
  .then(data => {
    // geriye front end-e gonderecem
    res.status(200).json({ whatData: data })
  })
  .catch(err => {
    console.log('error', err)
  }) 
})

router.post('/delete-what',async (req,res)=>{
  const { status, id } = req.body;
  
  What.findOneAndUpdate({_id: id}, { status: status }, {new:true}, function(err, payload) {
  if (err) console.log(err)
  return res.status(200).json({ payload: payload })
  })
})

router.put("/change-what/:id", async (req, res) => {
  const { id } = req.params;
  const { question, answer, level } = req.body;
  
  if (question.length!==0) {
    What.findByIdAndUpdate(
      { _id: id }, 
      { $set: { question } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  }
  else if (answer.length!==0) {
    What.findByIdAndUpdate(
      { _id: id }, 
      { $set: { answer } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  } 
  else if (level.length!==0) {
    What.findByIdAndUpdate(
      { _id: id }, 
      { $set: { level } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  }
  else {
    res.status(302).json({ question: "Data is null or undefined." })
  }
})

// ------------------------------- CLEVER ---------------------------------
router.get("/get-clever", async (req, res) => {
  
  const clever = await Clever.find({});
  
  if (clever.length !== 0) {
    return res.status(200).json({ clever })
  }
  res.status(434).json({ clever: "Hech bir malumat tapilmadi" });
    
})
  
router.post('/add-clever',async (req,res)=>{
  const {  status, level, question, answer, clas } = req.body;

  const clever = new Clever({
    status, level, question, answer, clas
})

clever
  .save()
  .then(data => {
    // geriye front end-e gonderecem
    res.status(200).json({ cleverData: data })
  })
  .catch(err => {
    console.log('error', err)
  }) 
})

router.post('/delete-clever',async (req,res)=>{
  const { status, id } = req.body;
  
  Clever.findOneAndUpdate({_id: id}, { status: status }, {new:true}, function(err, payload) {
  if (err) console.log(err)
  return res.status(200).json({ payload: payload })
  })
})

router.put("/change-clever/:id", async (req, res) => {
  const { id } = req.params;
  const { question, answer, level } = req.body;
  
  if (question.length!==0) {
    Clever.findByIdAndUpdate(
      { _id: id }, 
      { $set: { question } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  }
  else if (answer.length!==0) {
    Clever.findByIdAndUpdate(
      { _id: id }, 
      { $set: { answer } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  } 
  else if (level.length!==0) {
    Clever.findByIdAndUpdate(
      { _id: id }, 
      { $set: { level } }, 
      { new: true },
      (err, result) => {
        if (err) {
          console.log('error', err)
          res.status(404).json({ question: "question not found." })
        } else {
          res.status(200).json({ question: result })
        }
    });
  }
  else {
    res.status(302).json({ question: "Data is null or undefined." })
  }
})

// ----------------------------------PAROL----------------------
router.get("/get-parol", async (req, res) => {
    const password = await Password.find({});
  
    if (password.length !== 0) {
      return res.status(200).json({ password })
    }
    res.status(434).json({ password: "There is no any parol" });
});

router.put("/change-parol/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  
  Password.findByIdAndUpdate(
    { _id: id }, 
    { $set: { password } }, 
    { new: true },
    (err, result) => {
      if (err) {
        console.log('error', err)
        res.status(404).json({ question: "question not found." })
      } else {
        res.status(200).json({ question: result })
      }
  });
})

router.post('/add-parol',async (req,res)=>{
  const { user, password, status } = req.body;

  const parol = new Password({
    user, password, status
})

parol
  .save()
  .then(data => {
    // geriye front end-e gonderecem
    res.status(200).json({ parol: data })
  })
  .catch(err => {
    console.log('error', err)
  }) 
})

module.exports = router;
