import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuestionDetail } from '../../model/question.detail';
import { QuestionService } from '../../services/question.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  providers: [QuestionService]
})
export class QuestionDetailComponent implements OnInit {

  question:IQuestionDetail;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private _questionService : QuestionService,
              private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this._questionService.getQuestion(id).subscribe(
      question => this.question = question,
      error => this.errorMessage = error
    );
  }
  
  backList(){
    this.location.back();
  }  

}
