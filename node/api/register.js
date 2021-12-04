let user=require('../models/user');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports=function(req,res){
    // console.log(req.body, req.body.username)
    /*write your code here*/
     if(!req.body) {
    return res.status(400).send('Request body is missing')
  }
  const user1 = new user({
    	_id: new mongoose.Types.ObjectId().toHexString(),
      userName: req.body.username,
      pwd: req.body.password,
      email: req.body.email,
      mobile: req.body.mobile,
      location: req.body.location
    });

  user1.save()
  .then(result => {
        // console.log(result);
        if(!result){
          res.status(422).json({
            status: 'failed'
          })
        }
        res.status(200).json({
          status: 'success'
        });
      })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
          message: "Invalid authenticaton credentials!",
         
        });
  })
  
  }