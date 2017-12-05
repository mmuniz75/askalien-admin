import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { User } from './user';
import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class LoginService {

  public user : User;

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
      this.user=user
    }  
  }
 
  public logout(){
    this.user=null;
  }
  
}
