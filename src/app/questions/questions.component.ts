import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IQuestion } from '../../model/question';
import { IStatistic } from '../../model/statistic';
import { QuestionService } from '../../services/question.service';
import { QuestionFilter } from '../../services/question.filter';

declare var $: any;

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit {

  constructor(private _questionService : QuestionService,
              private route: ActivatedRoute,
              private location: Location ) { }


  questions:IQuestion[];
  statistic:IStatistic;
  errorMessage: String;
  answerId:Number;
  filter:QuestionFilter;
  
  ngOnInit() {
    $.getScript("../../assets/js/custom.min.js");
    $.getScript("../../assets/js/icheck.min.js");
    this.filter = new QuestionFilter();
    this.answerId = +this.route.snapshot.paramMap.get('id');

    if(this.answerId)
        this._questionService.getQuestionsByAnswer(this.answerId).subscribe(
          questions => this.questions=questions
        );
    else {
        this._questionService.getQuestions().subscribe(
                                        questions => this.questions=questions
                                      );
        this._questionService.getStatistic().subscribe(
          statistic => this.statistic = statistic
        ); 
    }  
  }

  ngAfterViewInit(){
    let self = this;
    $('input').on('ifChecked', function(event){
      self.filter.justFeedback=true;
      self.reloadQuestions();
    });

    $('input').on('ifUnchecked', function(event){
        self.filter.justFeedback=false;
        self.reloadQuestions();
    });
    
    $('#reportrange_right').on('apply.daterangepicker', function(ev, picker) {
      self.filterByDates(picker.startDate,picker.endDate);
    });
      
  }

  private reloadQuestions(){
    if( (!this.filter.ipFilter || this.filter.ipFilter == "") && (!this.filter.question || this.filter.question =="") )
      this.filter.startDates();

    this._questionService.getQuestionsByFilter(this.filter).subscribe(
      questions => this.questions=questions
    );
  }

  private filterByDates(startDate:Date,endDate:Date){
    this.filter.startDate = startDate;
    this.filter.endDate = endDate;
    this.filter.ipFilter = "";
    this.filter.question = "";
    this.filter.justFeedback = null;
    this._questionService.getQuestionsByFilter(this.filter).subscribe(
      questions => this.questions=questions
    );
  }

  private filterByText(){
     this.filter.startDate = null;
     this.filter.endDate = null;
     this.filter.justFeedback = null;
     this.reloadQuestions();
  }

  backList(){
    this.location.back();
  }  


}
