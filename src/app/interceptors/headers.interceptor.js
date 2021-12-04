
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { DataService } from '../services/data.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  private AUTH_HEADER = "authorization";
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
      // console.log('auth token' + JSON.stringify(req));
  return next.handle(this.addAuthenticationToken(req));

  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    
    // should add authorization token into headers except login and signup

    //  const authToken = this.dataService.getAuthToken();
     const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6I'
      // console.log('auth token' + JSON.stringify(request));
    
    // if(authToken){
      const authRequest = request.clone({
      headers: request.headers.set(this.AUTH_HEADER, authToken)
    });
    return authRequest;
    // }
    
    // return ;
    
  }

}

