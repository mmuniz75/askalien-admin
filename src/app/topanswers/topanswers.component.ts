import { Component, OnInit } from '@angular/core';

import { IAnswer } from '../../model/Answer';
import { AnswerService } from '../../services/answer.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-topanswers',
  templateUrl: './topanswers.component.html'
})
export class TopanswersComponent implements OnInit {

  constructor(private _answerService : AnswerService) { }
  
    answers:IAnswer[];
    errorMessage: string;
    feedback:Boolean = false;
  
    ngOnInit() {
      this.loadTopAnswers();
    }

    loadTopAnswers(){
      this._answerService.getTopAnswers(this.feedback).subscribe(
        Answers => this.answers=Answers,
        error => this.errorMessage = error
      );
    }
  

}
