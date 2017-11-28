import { Component, OnInit } from '@angular/core';

import { IAnswer } from '../../model/Answer';
import { AnswerService } from '../../services/answer.service';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-topanswers',
  templateUrl: './topanswers.component.html'
})
export class TopanswersComponent implements OnInit {

  constructor(private answerService : AnswerService) { }
  
    answers:IAnswer[];
      
    ngOnInit() {
      this.loadTopAnswers(false);
    }

    loadTopAnswers(feedback){
      this.answerService.getTopAnswers(feedback).subscribe(
        Answers => this.answers=Answers
      );
    }
  

}
