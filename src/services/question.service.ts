import { Http, Response,Headers, RequestOptions,  URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { IQuestion } from '../model/question';
import { IQuestionDetail } from '../model/question.detail';
import { IStatistic } from '../model/statistic';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

@Injectable()
export class QuestionService {

  private _questionsUrl = 'http://' + environment.SERVER_URL + '/questions';
  private _questionUrl = 'http://' + environment.SERVER_URL + '/question/';
  private _statisticUrl = 'http://' + environment.SERVER_URL + '/statistics';
  private _questionCountUrl = 'http://' + environment.SERVER_URL + '/questions/count';

  constructor(private _http: Http) { }

  public getQuestions() : Observable<IQuestion[]>{
    //let headers = new Headers({ 'Authorization': 'Basic ' +  btoa('admin:456') });   
    //let options = new RequestOptions({ headers: headers ,method: "get"});

    return this._http.get(this._questionsUrl)
        .map((response: Response) => <IQuestion[]> response.json())
        .catch(this.handleError);
  }

  public getStatistic() : Observable<IStatistic>{
    return this._http.get(this._statisticUrl)
        .map((response: Response) => <IStatistic> response.json())
        .catch(this.handleError);
  }

  public getCountQuestions() : Observable<Number>{
    return this._http.get(this._questionCountUrl)
        .map((response: Response) => <Number> response.json())
        .catch(this.handleError);
  }

  public getQuestion(id:Number) : Observable<IQuestionDetail>{
    return this._http.get(this._questionUrl + id)
        .map((response: Response) => <IQuestionDetail> response.json())
        .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error.message || 'Server error');
 }

}
