import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const loginService = this.injector.get(LoginService);
        
    const user = loginService.user
    if(user) {
      const authToken = user.token;
      
      const authReq = request.clone({
        headers: new HttpHeaders({
         'Authorization': 'Bearer ' + authToken,
        })
      });
      request = authReq;
    }  

    return next.handle(request);
  }
}

