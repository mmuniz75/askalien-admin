import { Injectable } from '@angular/core';

import { IUser } from '../model/user';
import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';
import { Service } from './service.service';

import { environment } from '../environments/environment';


@Injectable()
export class UserService extends Service{

  private usersUrl = `${environment.SERVER_URL}/usage`;
  
  public getUsers(year) : Observable<IUser[]>{

    if (year == 'All') {
      return this.http.get<IUser[]>(`${this.usersUrl}`,this.getHttpOptions())
                          .pipe(
                            catchError(this.handleError('UserService','getUsers', []))
                          );
   } else {                       
      return this.http.get<IUser[]>(`${this.usersUrl}/${year}`,this.getHttpOptions())
                          .pipe(
                            catchError(this.handleError('UserService','getUsers', []))
                          );
   }                       
  }


}
