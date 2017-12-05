import { Component, OnInit } from '@angular/core';

import { IAnswer } from '../../model/answer';
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
      
    ngOnInit() {
      $.getScript("../../assets/js/icheck.min.js");
      $.getScript("../../assets/js/custom.min.js");
      this.loadTopAnswers(false);
    }
    
    ngAfterViewInit(){
      let self = this;
      $('input').on('ifChecked', function(event){
          self.loadTopAnswers(true);
      });

      $('input').on('ifUnchecked', function(event){
          self.loadTopAnswers(false);
      });
      
    }

    loadTopAnswers(feedback){
      this.answerService.getTopAnswers(feedback).subscribe(
        Answers => this.answers=Answers
      );
    }
  

}
