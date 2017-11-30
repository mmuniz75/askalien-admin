import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient} from '@angular/common/http';

import { environment } from '../environments/environment';
import { IServer } from '../model/server';

@Injectable()
export class Service {

  constructor(protected http: HttpClient,
              private messageService: MessageService) { }

    
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
      return this.http.get<IServer>(environment.SERVER_CONF)
            .pipe(
              catchError(this.handleError<IServer>('Service','configServer'))
            );
    }
    
      
}    



