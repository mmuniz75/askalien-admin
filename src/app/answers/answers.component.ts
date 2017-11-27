import { Component, OnInit } from '@angular/core';

import { IAnswerSummary } from '../../model/answer.summary';
import { AnswerService } from '../../services/answer.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  providers: [AnswerService,MessageService]
})
export class AnswersComponent implements OnInit {

  constructor(private answerService : AnswerService) { }
  
    answers:IAnswerSummary[];
    errorMessage: string;
          
    ngOnInit() {
      this.answerService.getAnswers().subscribe(
        answers => this.answers = answers,
        error => this.errorMessage = error
      );

    
    }

}
