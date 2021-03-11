import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { User } from './user';
import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { HttpHeaders } from '@angular/common/http';

import { USER } from './consts';

import * as moment from 'moment'


@Injectable()
export class LoginService {

  private user: User

  public redirectUrl : string = '/';

  constructor(protected http: HttpClient) {} 

  public wakeServer() {
    this.http.get('http://' + environment.SERVER_URL.replace('/admin','/wakeup')).subscribe()
  }

  public login(user:User) : Observable<User>{

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const loginUrl = environment.AUTH_URL;
    
    return this.http.post<User>(loginUrl,user,options)
            .pipe(
              tap(u => this.setUser(u))
              ,//catchError(error => console.error(error))
            );
  }
  
  private setUser(user){
    if(user.role) {
      const date = moment()
      user.expiresDate =  date.add(user.expires,'seconds').format()
      this.user = user;
      localStorage.setItem(USER, JSON.stringify(user));
    }  

    if(user.errorMessage) {
      console.log(user.errorMessage)
    }
  }

  public getUser(){
    if(!this.user) {
        const localUser = JSON.parse(localStorage.getItem(USER));
        if(localUser)
          this.user = localUser
    }    

    return this.user && moment() <= moment(this.user.expiresDate)?this.user:null;
  }
 
  public logout(){
    this.user = null
    localStorage.removeItem("url_cash");
    localStorage.removeItem(USER);
  }

  public isLogged():boolean{
    return  this.getUser()!=null;
  }

  public isAdmin():boolean{
    return this.getUser().role=="admin";
  }
  
}
