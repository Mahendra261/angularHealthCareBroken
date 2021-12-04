let appointments=require('../models/appointments');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports=function(req,res){
    
  /*write your code here*/
  appointments.find()
  .then(result => {
        console.log(result);
        if(!result){
          res.status(400).json({
            message: "unable to find appointments"
          })
        }
        res.status(200).json({
          message: "success",
          appointments: result
        });
      })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
          message: "Internal error",
         
        });
  })
}