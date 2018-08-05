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
    loading: boolean;
          
    ngOnInit() {
      this.loadAnswers();  
    }
    
    getAnswer(id:number){
      if(id && id>0) {
        this.loading = true;
        this.answerService.getAnswerSummary(id).subscribe(
          answer => this.setAnswers([answer])
        );
      } else
        this.loadAnswers();  

    }

    loadAnswers(){
      this.loading = true;
      this.answerService.getAnswers().subscribe(
        answers => this.setAnswers(answers)
      );
    }

    setAnswers(answers){
      this.answers=answers;
      this.loading = false;
    }
    
    isAdmin():boolean{
      return this.loginService.isAdmin();
    }
    

}
