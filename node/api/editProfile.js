let user=require('../models/user');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports=function(req,res){
      
      /*write your code here*/ 
      user.updateOne({_id: req.body.userId},
        {
          $set: {
            mobile: req.body.mobile,
            email: req.body.email,
            location: req.body.location
          }
        })
        .then(result =>{
          // if(!result){
          //   return res.sendStatus(500).json({
          //     status: 'failed'
          //   })
          // }
          res.status(200).json({
            status : 'success'
          })
        })
        .catch(err =>{
          // res.status(500).json({
          //   err: err,
          //   status: 'failed'
          // })
          console.log(err);
        })
   
  }
