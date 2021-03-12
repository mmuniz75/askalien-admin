import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { User } from './user';
import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { HttpHeaders } from '@angular/common/http';
import { IQuestion } from '../model/question';



@Injectable()
export class LoginService {

  public user: User

  public redirectUrl : string = '/';

  constructor(protected http: HttpClient) {} 

  public wakeServer() {
    this.http.get<IQuestion>('http://' + environment.SERVER_URL.replace('/admin','/wakeup')).subscribe()
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
      this.user = user;
    }  

    if(user.errorMessage) {
      console.log(user.errorMessage)
    }
  }
 
  public logout(){
    this.user = null
  }

  public isLogged():boolean{
    return  this.user!=null;
  }

  public isAdmin():boolean{
    return this.user.role=="admin";
  }
  
}
