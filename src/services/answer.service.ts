import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Service } from './service.service';
 
import { HTTP_OPTIONS } from './consts';

import { IAnswer } from '../model/answer';
import { IAnswerSummary } from '../model/answer.summary';
import { AnswerDetail } from '../model/answer.detail';

import { environment } from '../environments/environment';

@Injectable()
export class AnswerService extends Service{

  private topAnswersUrl = `http://${environment.SERVER_URL}/topanswers`;
  private answersUrl = `http://${environment.SERVER_URL}/answers`;
  private answerUrl = `http://${environment.SERVER_URL}/answer`;
   
  
  public getTopAnswers(feedback:Boolean) : Observable<IAnswer[]>{
    const url = `${this.topAnswersUrl}?feedback=${feedback}`;
    
    return this.http.get<IAnswer[]>(url)
    .pipe(
      catchError(this.handleError('AnswerService','getTopAnswers', []))
    );

  }

  public getAnswers() : Observable<IAnswerSummary[]>{
    return this.http.get<IAnswerSummary[]>(this.answersUrl)
      .pipe(
        catchError(this.handleError('AnswerService','getAnswers', []))
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
    return this.http.post<AnswerDetail>(this.answerUrl, answer,HTTP_OPTIONS).pipe(
      catchError(this.handleError<AnswerDetail>('addAnswer'))
    );
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

