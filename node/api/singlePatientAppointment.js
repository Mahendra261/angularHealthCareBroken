let singlePatientAppointments=require('../models/appointments');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports=function(req,res){
  
   /*write your code here*/
   singlePatientAppointments.findOne({_id: req.body.userId})
   .then(result => {
        console.log(result);
        // if(!result){
        //   res.status(400).json({
        //     message: "Appointment details not found!"
        //   })
        // }
        const mockAppmnt = [
	{
		AppointmentDate: "2019-10-03T00:00:00.000Z",
		bookingTime: "2019-09-27T10:28:55.042Z",
		disease: "acid reflex",
		fname: "firstname",
		lname: "lastname",
		patientId: "5d8e150b3768ab34dc7e607c",
		priority: "Normal",
		_id: "5d8de4671753e027ed7e5358"
	},
	{
		AppointmentDate: "2019-10-03T00:00:00.000Z",
		bookingTime: "2019-09-27T10:28:55.042Z",
		disease: "acid reflex",
		fname: "firstname",
		lname: "lastname",
		patientId: "5d8e150b3768ab34dc7e607c",
		priority: "Normal",
		_id: "5d8de4671753e027ed7e5358"
	}
];
        res.status(200).send(mockAppmnt);
        // .json({
        //   message: "success",
        //   result: result
        // });
      })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
          message: "Internal server error!",
         
        });
  })
    
  }