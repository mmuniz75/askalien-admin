import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { LoginService } from '../services/login.service';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { SERVER_CONF } from './consts';
import { IServer } from '../model/server';
import { environment } from '../environments/environment';

@Injectable()
export class Service {

  constructor(protected http: HttpClient,
              private messageService: MessageService,
              private loginService: LoginService) { }

    
    handleError<T> (service:string,operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          this.log(service,`${operation} failed: ${error.message}`);
          if(error.error && error.error.message)
            this.log(service,`${operation} failed: ${error.error.message}`);
          return of(result as T);
        };
      }

    log(service:string,message: string) {
        this.messageService.add(`${service}: ${message}`);
    }

    public configServer():Observable<IServer>{
      return this.http.get<IServer>(SERVER_CONF)
            .pipe(
              tap(server => this.setServer(server)),
              catchError(this.handleError<IServer>('Service','configServer'))
            );
    }

    private setServer(server){
      environment.SERVER_URL = server.server + '/admin'
    }
    
    public getHttpOptions(){
      let user = this.loginService.user;
      let options = {};
      if(user){
        let token = btoa(`${user.login}:${user.password}`); 
        options = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Authorization': `Basic ${token}`})
        };
      }
      return options;                         
   };
      
}    



