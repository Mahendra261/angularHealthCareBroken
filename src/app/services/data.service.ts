import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DataService {

  userId : string;
  
  isLogIn: BehaviorSubject<boolean>;
  authToken;

  constructor(private api: ApiService) {
      this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(username: string, password: string): Observable<boolean> {

    // store 'uid' from response as key name 'uid' to the localstorage
    // store 'token' from response as key name 'token' to the localstorage

    // return true if user authenticated

    // return false if user not authenticated 
    // if(username == 'test' && password == 'password'){
    //   this.isLogIn.next(false);
    //   return of(false);
    // }

  return this.api.checkLogin(username,password)
    .pipe(tap(res =>{

      if(res.success){
        // console.log('true');
      this.isLogIn.next(true);
      localStorage.setItem('uid',res.uid);
      localStorage.setItem('token',res.token);
      this.userId = localStorage.getItem('uid');
      this.authToken = this.getAuthToken();
      }else{
        this.isLogIn.next(false);
      }
          }), map(res =>{
      return this.userId? true : false;
    }));
  }

  getAuthStatus(): Observable<boolean> {

    // return true/false as a auth status

     return  this.isLogIn.asObservable();
  }

  getAuthToken(){
    
    return localStorage.getItem('token');
  }

  regNewUser(regNewUser): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.regNewUser(regNewUser);

  }

  doLogOut() {

    // You should remove the key 'uid', 'token' if exists
    
      localStorage.removeItem('uid');
      localStorage.removeItem('token');
      

  }

  getUserDetails(): Observable<any> {

    // should return user details retrieved from api service
    let userid = localStorage.getItem('uid')
    // console.log('getUserDeatils ****  ' + userid)
    return this.api.getUserDetails(userid);
  }

  updateProfile(userDetails): Observable<boolean> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.updateDetails(userDetails)
        .pipe(map(res => {
          if(res){
            // console.log('RESPONSE USERPROFILE 1 _____' + res)
            return true;
          }
          // console.log('RESPONSE USERPROFILE2 _____' + res)
        }));
  }

  registerPatient(patientDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.registerPatient(patientDetails);
  }

  getAllPatientsList(): Observable<any> {

    // should return all patients list retrieved from ApiService

    // handle error 

    return this.api.getAllPatientsList();
  }

  getParticularPatient(id): Observable<any> {

    // should return particular patient details retrieved from ApiService

    // handle error 

    return this.api.getParticularPatient(id);
  }
  
  diseasesList(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

   return this.api.diseasesList();
  }

  scheduleAppointment(appointmentDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

   return this.api.scheduleAppointment(appointmentDetails);
  }

  getSinglePatientAppointments(patientId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.getSinglePatientAppointments(patientId);
  }

  deleteAppointment(appointmentId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.deleteAppointment(appointmentId);
  }

  requestedAppointments(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.requestedAppointments();
  }


}

