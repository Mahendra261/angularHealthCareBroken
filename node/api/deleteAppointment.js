let singlePatientAppointments=require('../models/appointments');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports=function(req,res){
    res.status(200).json({
           status: "success"
       });
    /*write your code here*/
    // singlePatientAppointments.deleteOne({_id: req.query.appointmentId},function(err,data){
    //     if(err) {
    //       return res.status(401).json({
    //         status: "failed"
    //       })
    //     };
    //     console.log('the document is deleted')
    //     res.status(200).json({
    //       status: "success"
    //     });

    // })
    
  }