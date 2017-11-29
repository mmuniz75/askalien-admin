import { Component, OnInit } from '@angular/core';

import { IAnswer } from '../../model/Answer';
import { AnswerService } from '../../services/answer.service';
import { MessageService } from '../../services/message.service';

declare var $: any;

@Component({
  selector: 'app-topanswers',
  templateUrl: './topanswers.component.html'
})
export class TopanswersComponent implements OnInit {

  constructor(private answerService : AnswerService) { }
  
    answers:IAnswer[];
    feedback : boolean = false;
      
    ngOnInit() {
      $.getScript("../../assets/js/icheck.min.js");
      $.getScript("../../assets/js/custom.min.js");
      this.loadTopAnswers(false);
    }
    
    ngAfterViewChecked(){
      let self = this;
      $('input').on('ifChecked', function(event){
        if(!self.feedback){
          self.feedback = true;
          self.loadTopAnswers(true);
        }
      });

      $('input').on('ifUnchecked', function(event){
        if(self.feedback){
          self.feedback = false;
          self.loadTopAnswers(false);
        }
      });
      
    }

    loadTopAnswers(feedback){
      this.answerService.getTopAnswers(feedback).subscribe(
        Answers => this.answers=Answers
      );
    }
  

}
