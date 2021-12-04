import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Users } from '../../models/users';
import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
userName: string;
userId;
isLoggedIn : boolean;
  // used as a flag to display or hide form
  editProfile = false;
  userDetails;
  updateMyDetails : any = {};
  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';
  constructor(private dataService: DataService) { 

  }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
      userName: new FormControl({value: this.userName, disabled: true}, [Validators.required]),
      mobile: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      location: new FormControl('',[Validators.required])
    });
     this.userId = localStorage.getItem('uid');
     this.editProfile = true;
      this.getProfileDetails();
    // get profile details and display it
    //  this.dataService.getAuthStatus().subscribe(
    //     res =>{
    //       this.isLoggedIn = res;
    //       if(this.isLoggedIn){

    //         this.userId = JSON.parse(localStorage.getItem('uid'));
    //         this.getProfileDetails();
    //       }
    //     })
  }

  getProfileDetails() {

    // retrieve user details from service using userId
     this.dataService.getUserDetails()
    .subscribe(res => {
      this.userDetails = res;
      this.editProfileForm.patchValue({userName: this.userDetails.user_name});
      this.userName = this.userDetails.user_name;
    });

  }

  get f(){
    return this.editProfileForm.controls;
  }

  changeMyProfile() {

    // if successfully changed the profile it should display new details hiding the form
    if(this.dataService.updateProfile(this.userId, this.editProfileForm.value)){
      this.userDetails = this.editProfileForm.value;
      this.userDetails.user_name = this.userName;
      this.discardEdit();
    }
  }

  editMyProfile() {

    // change editProfile property value appropriately
    this.editProfile = true;
  }

  discardEdit() {

    // change editProfile property value appropriately
    this.editProfile = false;
  }

}
