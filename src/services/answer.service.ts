import { Http, Response,Headers, RequestOptions,  URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { IAnswer } from '../model/answer';
import { IAnswerSummary } from '../model/answer.summary';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class AnswerService {

  private _topAnswers = 'http://' + environment.SERVER_URL + '/topanswers?feedback=';
  private _answers = 'http://' + environment.SERVER_URL + '/answers';
    
  constructor(private _http: Http) { }

  public getTopAnswers(feedback:Boolean) : Observable<IAnswer[]>{

    return this._http.get(this._topAnswers + feedback)
        .map((response: Response) => <IAnswer[]> response.json())
        .catch(this.handleError);
  }


  public getAnswers() : Observable<IAnswerSummary[]>{
    
        return this._http.get(this._answers)
            .map((response: Response) => <IAnswerSummary[]> response.json())
            .catch(this.handleError);
      }
    

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error.message || 'Server error');
 }

}
