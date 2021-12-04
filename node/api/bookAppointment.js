let appointments=require('../models/appointments');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports=function(req,res){
    
     /*write your code here*/
    const newAppointment = new appointments({
      _id: new mongoose.Types.ObjectId().toHexString(),
        fname: req.body.fname,
        lname: req.body.lname,
          disease:req.body.disease,
          priority:req.body.priority,
          AppointmentDate:req.body.tentativedate,
          patientId:req.body.patientId,
          bookingTime: req.body.registeredTime
    }) 

    newAppointment.save()
    .then(result =>{
      res.status(200).json({
        status: "success"
      })
    })
    .catch(err =>{
      res.status(404).json({
        status: "failed"
      })
    })
  }