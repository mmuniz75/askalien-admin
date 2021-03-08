import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { LoginService } from './login.service';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { SERVER_CONF } from './consts';
import { URL_CHASH } from './consts';
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
          
          
          if(error.error && error.error.message) {
            console.error(service,`${operation} failed: ${error.error.message}`)
            this.log(error.error.message);
          }  else if(error.message){
            console.error(service,`${operation} failed: ${error.message}`)
            this.log(error.message);
          }
                    
          return of(result as T);
        };
      }

    log(message: string) {
        this.messageService.clear()
        this.messageService.add(message);
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
      localStorage.setItem(URL_CHASH,environment.SERVER_URL);
    }
    
    public getHttpOptions(){
      let user = this.loginService.getUser();
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



