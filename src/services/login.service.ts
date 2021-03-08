import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { User } from './user';
import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { HttpHeaders } from '@angular/common/http';

import { USER } from './consts';


@Injectable()
export class LoginService {

  public redirectUrl : string = '/';

  constructor(protected http: HttpClient) {} 

  public login(user:User) : Observable<User>{

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const loginUrl = `http://${environment.SERVER_URL.replace('/admin','/login')}`;
    
    return this.http.post<User>(loginUrl,user,options)
            .pipe(
              tap(u => this.setUser(u))
              ,//catchError(error => console.error(error))
            );
  }
  
  private setUser(user){
    if(user.role) {
      localStorage.setItem(USER, JSON.stringify(user));
    }  
  }

  public getUser(){
    const user = new User()
    user.login ="muniz"
    user.role="ADMIN"

    return user
    //const user = JSON.parse(localStorage.getItem(USER));
    //return user;
  }
 
  public logout(){
    localStorage.removeItem(USER);
    localStorage.removeItem("url_cash");
  }

  public isLogged():boolean{
    return this.getUser()!=null;
  }

  public isAdmin():boolean{
    return this.getUser().role=="ADMIN";
  }
  
}
