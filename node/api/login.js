let user=require('../models/user');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient



module.exports=function(req, res) {
    let fetchedUser;
    // console.log(req.body)
    // let user1 = new user;
   user.findOne({userName: req.body.uname})
   .then(user => {
     if(!user){
       return res.status(401).json({
        error: 'test 401 error',
        status: 401, 
        statusText: 'Invalid username or password'
     })
    }
    fetchedUser = user;
    console.log('fetchedUser details: ' + fetchedUser);

    if(fetchedUser.pwd === req.body.pwd){
      const token = jwt.sign(
      {email: fetchedUser.email, uid: fetchedUser._id},
      config.secret
    );
       res.status(200).json({
        message: 'Authentication successful!',
        success: true,
        token: token,
        uid: fetchedUser._id,
        mobile: fetchedUser.mobile,
        email: fetchedUser.email,
        location: fetchedUser.location,
        userName: fetchedUser.userName
      })
    } else{
      res.status(500).json({
        error: 'test 401 error',
        status: 401, 
        statusText: 'Invalid username or password'
      })
    }
  })
  
    // if(!result){
    //   return res.status(401).json({
    //       message: "Auth failed"
    //     });
    // }
  

    
  }