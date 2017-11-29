import { Injectable } from '@angular/core';

import { IUser } from '../model/user';
import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';
import { Service } from './service.service';
import { HTTP_OPTIONS } from './consts';

import { environment } from '../environments/environment';


@Injectable()
export class UserService extends Service{

  private usersUrl = `http://${environment.SERVER_URL}/usage`;
  
  public getUsers(year:number) : Observable<IUser[]>{

    return this.http.get<IUser[]>(`${this.usersUrl}/${year}`)
                        .pipe(
                          catchError(this.handleError('UserService','getUsers', []))
                        );
  }


}
