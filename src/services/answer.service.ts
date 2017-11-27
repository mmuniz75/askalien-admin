import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { IAnswer } from '../model/answer';
import { IAnswerSummary } from '../model/answer.summary';
import { AnswerDetail } from '../model/answer.detail';

import { environment } from '../environments/environment';

@Injectable()
export class AnswerService {

  private topAnswersUrl = 'http://' + environment.SERVER_URL + '/topanswers';
  private answersUrl = 'http://' + environment.SERVER_URL + '/answers';
  private answerUrl = 'http://' + environment.SERVER_URL + '/answer';
    
  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  public getTopAnswers(feedback:Boolean) : Observable<IAnswer[]>{
    const url = `${this.topAnswersUrl}?feedback=${feedback}`;
    
    return this.http.get<IAnswer[]>(url)
    .pipe(
      catchError(this.handleError('getTopAnswers', []))
    );

  }

  public getAnswers() : Observable<IAnswerSummary[]>{
    return this.http.get<IAnswerSummary[]>(this.answersUrl)
      .pipe(
        catchError(this.handleError('getAnswers', []))
      );
  }
 
  public getAnswer(id:number) : Observable<AnswerDetail>{
    const url = `${this.answerUrl}/${id}`;
    return this.http.get<AnswerDetail>(url)
    .pipe(
      catchError(this.handleError<AnswerDetail>(`getAnswer id=${id}`))
    );
  }

  public addAnswer (answer: AnswerDetail): Observable<AnswerDetail> {
    return this.http.post<AnswerDetail>(this.answerUrl, answer, httpOptions).pipe(
      catchError(this.handleError<AnswerDetail>('addAnswer'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      if(error.error && error.error.message)
        this.log(`${operation} failed: ${error.error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('AnswerService: ' + message, );
  }

  public isValid(answer:AnswerDetail):boolean{
    if (answer.question && answer.question.length > 0
        && answer.video && 
        answer.content && answer.content.length > 0)
        return true;
    else 
        return false;    
}

}
