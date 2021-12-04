import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DatePipe]
})
export class FormComponent implements OnInit {

  complexForm: FormGroup;
  patientDetails = new Patient;
  result;

  today: string;

  noRecordsFound = 'No patient records found in the list. Click on Register New Patient to add Patient details.';

  emptyName = 'You must include a name.';
  minlengthName = 'Your name must be at least 3 characters long.';
  maxlengthName = 'Your name cannot exceed 20 characters.';
  noGender = 'You must select a gender.';
  noDob = 'You must select a valid date of birth.';
  noMobile = 'You must include mobile number.';
  numberMobile = 'You must enter a valid 10 digit mobile number.';
  maxlengthMobile = 'Your mobile number should not exceed 10 digits.';
  patternEmail = 'You must enter a valid Email ID.';

  ngOnInit() {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  constructor( fb: FormBuilder,private datePipe: DatePipe,private route: Router, private dataService: DataService){
    // add necessary validators
    this.complexForm = fb.group({
      'name' : ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      'gender' : [null, [Validators.required]],
      'dob' : [null,[Validators.required]],
      'mobile' : ['',[Validators.pattern("[0-9]{0-10}")]],
      'email' : ['',[Validators.email]]
    })
  }
  get f(){
    return this.complexForm.controls;
  }

  submitForm(value: any){
    const patientData = {
      patient_name : value.firstname,
      patient_gender : value.gender,
      patient_dob : value.dob,
      patient_mobile : value.mobile,
      patient_email: value.email,

    }

    this.dataService.registerPatient(patientData)
    .subscribe(res => {
      if(true){
        this.route.navigate(['patientList'])
      }
    },err =>{
      console.log(err);
    })
    // should reister new patient using service
       // fields that need to be added: patient_name, patient_gender, patient_dob, patient_mobile, patient_email
    // if added successfully should redirect to 'patientList' page

  }

}
