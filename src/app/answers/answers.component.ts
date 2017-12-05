import { Component, OnInit } from '@angular/core';

import { IAnswerSummary } from '../../model/answer.summary';
import { AnswerService } from '../../services/answer.service';
import { MessageService } from '../../services/message.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html'
})
export class AnswersComponent implements OnInit {

  constructor(private answerService : AnswerService,
              private loginService : LoginService) { }
  
    answers:IAnswerSummary[];
          
    ngOnInit() {
      this.loadAnswers();  
    }
    
    getAnswer(id:number){
      if(id && id>0) 
        this.answerService.getAnswerSummary(id).subscribe(
          answer => this.answers = [answer]
        );
      else
        this.loadAnswers();  

    }

    loadAnswers(){
      this.answerService.getAnswers().subscribe(
        answers => this.answers = answers
      );
    }
    
    isAdmin():boolean{
      return this.loginService.isAdmin();
    }
    

}
