let patientDetails=require('../models/patients');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient


module.exports=function(req, res) {
    
  
    /*write your code here*/
    console.log('patientId single *****' +req.params.id+ '************')
    patientDetails.findOne({_id: req.query.patientId})
    .then(result => {
        console.log(result);
        if(!result){
          res.status(400).json({
            message: 'no data found!'
          })
        }
        res.status(200).json({
        _id: result._id,
        fname: result.fname,
        lname: result.lname,
        gender: result.gender,
        dob: result.dob,
        mobile: result.mobile,
        email: result.email,
        desc: result.desc,
        userId: result.userId,
        createdAt: result.timestamps,
        updatedAt: result.timestamps
        });
      })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
          message: "Internal server error",
         
        });
  })
    
    
  }