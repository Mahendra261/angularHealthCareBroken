let patientDetails=require('../models/patients');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports=function(req,res){
    
    /*write your code here*/

    patientDetails.find()
    .then(result => {
        console.log(result);
        if(!result){
         return res.status(400).json({
            message: "unable to find patients"
          })
        }
        // let arrayResponse = [];
        // result.forEach((element, index,array) =>{
        //     resultObj = {
	      // _id: result[index]._id,
        // fname: result[index].fname,
        // lname: result[index].lname,
        // gender: result[index].gender,
        // dob: result[index].dob,
        // mobile: result[index].mobile,
        // email: result[index].email,
        // desc: result[index].desc,
        // userId: result[index].userId,
        // createdAt: result[index].timestamps,
        // updatedAt: result[index].timestamps
        //     }

        //     arrayResponse.push(resultObj);
        // })
        const mockPatientDetails = [
	{
	"_id": "5d8e150b3768ab34dc7e607c",
	"fname": "nelson",
	"lname": "great",
	"gender": "Male",
	"dob": "2019-09-21T00:00:00.000Z",
	"mobile": 9898999999,
	"email": "nelson@abc.in",
	"desc": "nothing",
	"userId": "5d8e0c843768ab34dc7e607a",
	"createdAt": "2019-09-27T13:56:27.448Z",
	"updatedAt": "2019-09-27T13:56:27.448Z"
	},
	{
	"_id": "5d8fb22e1d9d0652ef4781ad",
	"fname": "fnmae",
	"lname": "lname",
	"gender": "Male",
	"dob": "2019-08-31T00:00:00.000Z",
	"mobile": 9988776655,
	"email": "abcd@def.gh",
	"desc": "nothing",
	"userId": "5d89f8f95327ae2548c8ad98",
	"createdAt": "2019-09-28T19:19:10.642Z",
	"updatedAt": "2019-09-28T19:19:10.642Z"
	}
];
        res.status(200).send(mockPatientDetails);
      })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
          message: "Internal error",
         
        });
  })


  }