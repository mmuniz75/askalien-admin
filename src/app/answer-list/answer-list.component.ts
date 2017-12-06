import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnswerSummary } from '../../model/answer.summary';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html'
})
export class AnswerListComponent implements OnInit {
  
  answers:IAnswerSummary[];

  constructor(private answerService : AnswerService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const from = +this.route.snapshot.paramMap.get('from');
    const to = +this.route.snapshot.paramMap.get('to');

    this.answerService.listAnswers(from,to).subscribe(
      answers => this.answers = answers
    );
  }

}
