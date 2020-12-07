require('dotenv').config();
const nodemailer = require("nodemailer");
const express=require('express');

const router=express.Router();

router.post("/post-mail", async (req, res) => {
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  
  let mailOptions = {
    from: req.body.from,
    to: 'n_bagi@hotmail.com',
    subject: req.body.subject,
    text: req.body.text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (!error) {
        return res.status(200).json({ info });
    } 
    res.status(434).json({ error });
      
  }); 
})
module.exports = router;