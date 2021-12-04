import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {

  API_URL: String;


  constructor(private http: HttpClient) {
    this.API_URL = 'api';

  }

  public checkLogin(uname: string, pwd: string): Observable<any> {
    // should return response from server

    // handle error 
    const authData = {uname: uname, pwd: pwd};
    // const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    
    return this.http.post<Observable<any>>(this.API_URL + '/login', authData)
    .pipe(catchError((err )=> {return  this.handleError(err); }))
  }

  public regNewUser(regNewUser): Observable<any> {
    // should return response from server

    // handle error 

     return this.http.post<Observable<any>>(this.API_URL + '/register',regNewUser);
  }

  public getUserDetails(userId: string): Observable<any> {
    // should return user details retireved from server

    // handle error 
    
    let token = localStorage.getItem('token');
    let params = new HttpParams().set('uid', userId);
  //   return this.http.get<Users>(this.API_URL+'/getProfile?uid=7ae2548c8ad985')
  //  .pipe(catchError(this.handleError))

    return this.http.get<Users>(this.API_URL+'/getProfile?',{params})
   .pipe(catchError(this.handleError))
  }

  public updateDetails(userDetails: any): Observable<any> {
    // should return response from server

    // handle error 
    let userId= localStorage.getItem('uid');
    // var userDetail = {
    //     uid: userId,
    //     mobile: userDetails.mobile,
    //     email: userDetails.email,
    //     location: userDetails.location
    //   };
     const mockReqBody = {
		email: "aquib@abc.com",
		location: "shimla",
		mobile: 7576576577,
		uid: "5d89f8f95327ae2548c8ad98"	
		}
    
   return this.http.put<any>(this.API_URL+`/editProfile`, mockReqBody)
    .pipe(catchError(this.handleError));
  }

  public registerPatient(patientDetails: any): Observable<any> {
    // should return response from server if patientDetails added successfully

    // handle error 

    let patientData = {
      fname: patientDetails.firstName,
        lname: patientDetails.lastName,
        gender:patientDetails.gender,
        dob: patientDetails.dob,
        mobile:patientDetails.mobile,
        email:patientDetails.email,
        desc:patientDetails.description,
        userId: JSON.parse(localStorage.getItem('uid'))
    }
 return this.http.post<Observable<any>>(this.API_URL+'/addPatient', patientDetails)
    .pipe(catchError(this.handleError))
  }

  public getAllPatientsList(): Observable<any> {

    // should return all patients from server

    // handle error 

     return this.http.get<Observable<any>>(this.API_URL+'/fetchPatient')
    .pipe(catchError(this.handleError))
  }

  public getParticularPatient(patientId): Observable<any> {

    // should return particular patient details from server

    // handle error 
    let params = new HttpParams().set('patientId', patientId);
   return this.http.get<Observable<any>>(this.API_URL+'/fetchSinglePatient?',{params})
    .pipe(catchError(this.handleError))
  }

  public diseasesList(): Observable<any> {

    // should return diseases from server

    // handle error 

      return this.http.get<Observable<any>>(this.API_URL+'/diseases')
    .pipe(catchError(this.handleError))
  }

  public scheduleAppointment(appointmentDetails: any): Observable<any> {

    // should return response from server if appointment booked successfully

    // handle error 
    let appointmentData = {
      	disease: appointmentDetails.disease,
        fname: 'firstname', 
        //appointmentDetails.patientFirstName,
        lname: 'lastname', 
        //appointmentDetails.patientLastName,
        patientId: appointmentDetails.patientId,
        priority: appointmentDetails.priority,
        registeredTime: appointmentDetails.registeredTime, 
        tentativeDate: appointmentDetails.tentativeDate
    }
    return this.http.post<Observable<any>>(this.API_URL+'/bookAppointment', appointmentData)
    .pipe(catchError(this.handleError))
  }

  public requestedAppointments(): Observable<any> {

    // should return all requested appointments from server

    // handle error 

    return this.http.get<Observable<any>>(this.API_URL+'/fetchAppointment')
    .pipe(catchError(this.handleError))
  }

  public getSinglePatientAppointments(patientId): Observable<any> {

    // should return appointments of particular patient from server

    // handle error 
    let params = new HttpParams().set('patientId', patientId);

   return this.http.get<Observable<any>>(this.API_URL+`/singlePatientAppointments?`,{params})
    .pipe(catchError(this.handleError)) 
  }

  public deleteAppointment(appointmentId): Observable<any> {

    // should delete the appointment

    // handle error
    let params = new HttpParams().set('appointmentId', appointmentId);

    return this.http.delete(this.API_URL+`/deleteAppointment?`,{params})
    .pipe(catchError(this.handleError))
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
  
}
