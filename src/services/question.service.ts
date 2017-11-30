import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { Service } from './service.service';
import { HTTP_OPTIONS } from './consts';

import { IQuestion } from '../model/question';
import { IQuestionDetail } from '../model/question.detail';
import { IStatistic } from '../model/statistic';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

import { QuestionFilter } from './question.filter';

import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class QuestionService extends Service {

  private questionsUrl = `http://${environment.SERVER_URL}/questions`;
  private questionUrl = `http://${environment.SERVER_URL}/question`;
  private statisticUrl = `http://${environment.SERVER_URL}/statistics`;
  private questionCountUrl = `http://${environment.SERVER_URL}/questions/count`;

  public getQuestions() : Observable<IQuestion[]>{
    
    return this.http.get<IQuestion[]>(this.questionsUrl,HTTP_OPTIONS)
                                      .pipe(
                                        catchError(this.handleError('QuestionService','getQuestions', []))
                                      );

  }


  public getQuestionsByFilter(filter:QuestionFilter) : Observable<IQuestion[]>{
          return this.http.post<IQuestion[]>(this.questionsUrl, filter,HTTP_OPTIONS)
          .pipe(
            catchError(this.handleError('QuestionService','getQuestionsByFilter', []))
          );
        
  }

  public getQuestionsByAnswer(answerId:Number) : Observable<IQuestion[]>{
    return this.http.get<IQuestion[]>(`${this.questionsUrl}/${answerId}`,HTTP_OPTIONS)
                                      .pipe(
                                        catchError(this.handleError('QuestionService','getQuestionsByAnswer', []))
                                      );
  }

  public getStatistic() : Observable<IStatistic>{
    return this.http.get<IStatistic>(this.statisticUrl,HTTP_OPTIONS)
                                    .pipe(
                                      catchError(this.handleError<IStatistic>('QuestionService','getStatistic()'))
                                    );
  }

  public getCountQuestions() : Observable<Number>{
    return this.http.get<Number>(this.questionCountUrl,HTTP_OPTIONS)
                                .pipe(
                                  catchError(this.handleError<Number>('QuestionService','getStatistic()'))
                                );
  }

  public getQuestion(id:Number) : Observable<IQuestionDetail>{
    return this.http.get<IQuestionDetail>(`${this.questionUrl}/${id}`,HTTP_OPTIONS)
                                          .pipe(
                                            catchError(this.handleError<IQuestionDetail>('QuestionService','getStatistic()'))
                                          );
  }


}
