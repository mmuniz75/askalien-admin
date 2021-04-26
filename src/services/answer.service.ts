import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';
import { Service } from './service.service';

import { IAnswer } from '../model/answer';
import { IAnswerSummary } from '../model/answer.summary';
import { AnswerDetail } from '../model/answer.detail';

import { environment } from '../environments/environment';

@Injectable()
export class AnswerService extends Service{

  private topAnswersUrl = `http://${environment.SERVER_URL}/topanswers`;
  private answersUrl = `http://${environment.SERVER_URL}/answers`;
  private answerUrl = `http://${environment.SERVER_URL}/answer`;
  private answerUrl2 = `http://${environment.SERVER_URL}2/answer`;
  private answerSummaryUrl = `http://${environment.SERVER_URL}/summary-answer`;
  private answersListUrl = `http://${environment.SERVER_URL.replace('/admin','')}/answers`;
   
  
  public getTopAnswers(feedback:Boolean) : Observable<IAnswer[]>{
    const url = `${this.topAnswersUrl}?feedback=${feedback}`;
    
    return this.http.get<IAnswer[]>(url,this.getHttpOptions())
    .pipe(
      catchError(this.handleError('AnswerService','getTopAnswers', []))
    );

  }

  public getAnswers() : Observable<IAnswerSummary[]>{
    return this.http.get<IAnswerSummary[]>(this.answersUrl,this.getHttpOptions())
      .pipe(
        catchError(this.handleError('AnswerService','getAnswers', []))
      );
  }
 
  public getAnswer(id:number) : Observable<AnswerDetail>{
    const url = `${this.answerUrl}/${id}`;
    return this.http.get<AnswerDetail>(url,this.getHttpOptions())
    .pipe(
      catchError(this.handleError<AnswerDetail>(`getAnswer id=${id}`))
    );
  }

  public getAnswerSummary(id:number) : Observable<IAnswerSummary>{
    const url = `${this.answerSummaryUrl}/${id}`;
    return this.http.get<IAnswerSummary>(url,this.getHttpOptions())
    .pipe(
      catchError(this.handleError<IAnswerSummary>(`getAnswerSummary id=${id}`))
    );
  }

  public addAnswer (answer: AnswerDetail): Observable<AnswerDetail> {
    return this.http.post<AnswerDetail>(this.answerUrl2, answer,this.getHttpOptions())
      .pipe(catchError(this.handleError<AnswerDetail>('AnswerService','addAnswer'))
    );
  }

  public updateAnswer (answer: AnswerDetail): Observable<AnswerDetail> {
    return this.http.put<AnswerDetail>(this.answerUrl2, answer,this.getHttpOptions())
      .pipe(catchError(this.handleError<AnswerDetail>('AnswerService','updateAnswer'))
    );
  }

  public isValid(answer:AnswerDetail):boolean{
    if (answer.question && answer.question.length > 0
        && answer.videoNumber && 
        answer.content && answer.content.length > 0)
        return true;
    else 
        return false;    
}

}

