import { Injectable } from '@angular/core';

import { IView } from '../model/view';
import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';
import { Service } from './service.service';

import { environment } from '../environments/environment';


@Injectable()
export class ViewService extends Service{

  private viewsUrl = `http://${environment.SERVER_URL}/view`;
  
  public getViews(year:number) : Observable<IView[]>{

    return this.http.get<IView[]>(`${this.viewsUrl}/${year}`,this.getHttpOptions())
                        .pipe(
                          catchError(this.handleError('ViewService','getViews', []))
                        );
  }


}
