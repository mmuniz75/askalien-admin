import { Component, OnInit } from '@angular/core';

import { IQuestion } from '../../model/question';
import { IStatistic } from '../../model/statistic';
import { QuestionService } from '../../services/question.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  providers: [QuestionService]
})
export class QuestionsComponent implements OnInit {

  constructor(private _questionService : QuestionService) { }

  questions:IQuestion[];
  statistic:IStatistic;
  errorMessage: string;

  ngOnInit() {
    this._questionService.getQuestions().subscribe(
                                        questions => this.questions=questions,
                                        error => this.errorMessage = error
                                      );
    this._questionService.getStatistic().subscribe(
      statistic => this.statistic = statistic,
      error => this.errorMessage = error
    ); 
  }

}
