let diseases=require('../models/diseases');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports=function(req,res){

  /*write your code here*/
  diseases.find()
  .then(result => {
        console.log("diseases list "+result);
        if(!result){
          res.status(400).json({
            message: 'no list found!'
          })
        }
        res.status(200).send(result);
      })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
          message: "Unable to fetch details",
         
        });
  })
  }