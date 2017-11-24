import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnswerDetail } from '../../model/answer.detail';
import { AnswerDetail } from '../../model/answer.detail';
import { AnswerService } from '../../services/answer.service';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  providers: [AnswerService]
})
export class AnswerComponent implements OnInit {

  constructor(private _answerService : AnswerService,
              private route: ActivatedRoute) { }
  
  answer:IAnswerDetail;
  errorMessage: string;
          
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id!=0){
      this._answerService.getAnswer(id).subscribe(
        answer => this.answer = answer,
        error => this.errorMessage = error
      );
    }else
      this.answer = new AnswerDetail(); 
  }  
}


