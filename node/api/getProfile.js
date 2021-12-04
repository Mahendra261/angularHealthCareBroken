let user=require('../models/user');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient



module.exports=function(req, res) {
    
    /*write your code here*/
    // console.log(req);
    // console.log('req getProfile' + req.userData)
     user.findById(req.userData.userId)
     .then(result =>{
       if(!result)
       {
        return res.status(500).json({
          status: false
         })
       }
       else{
        res.status(200).json({
          status: 200,
          _id: result._id,
          userName: result.userName,
          pwd: result.pwd,
          email: result.email,
          mobile: result.mobile,
          location: result.location
        })
       }
     })
     .catch(err =>{
       res.status(500).json({
         message: 'An internal server error',
         error: err
       })
     })

  }