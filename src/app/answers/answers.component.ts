import { Component, OnInit } from '@angular/core';

import { IAnswerSummary } from '../../model/answer.summary';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  providers: [AnswerService]
})
export class AnswersComponent implements OnInit {

  constructor(private _answerService : AnswerService) { }
  
    answers:IAnswerSummary[];
    errorMessage: string;
          
    ngOnInit() {
      this._answerService.getAnswers().subscribe(
        answers => this.answers = answers,
        error => this.errorMessage = error
      );

    
    }

}
