import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IQuestion } from '../../model/question';
import { IQuestionDetail } from '../../model/question.detail';
import { IStatistic } from '../../model/statistic';
import { QuestionService } from '../../services/question.service';
import { QuestionFilter } from '../../services/question.filter';

declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private _questionService : QuestionService,
              private route: ActivatedRoute,
              private location: Location ) { }


  questions:IQuestion[];
  question:IQuestionDetail;
  statistic:IStatistic;
  errorMessage: String;
  answerId:Number;
  filter:QuestionFilter;
  @ViewChild('divDetail') el:ElementRef;
  
  ngOnInit() {
    $.getScript("../../assets/js/custom.min.js");
    
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
      self.clearDates();
      self.reloadQuestions();
    });

    $('input').on('ifUnchecked', function(event){
        self.filter.justFeedback=false;
        self.resetDates();
        self.reloadQuestions();
    });
    
    $('#reportrange_right').on('apply.daterangepicker', function(ev, picker) {
      self.filterByDates(picker.startDate,picker.endDate);
    });
      
  }

  private reloadQuestions(){
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
    if( (!this.filter.ipFilter || this.filter.ipFilter == "") && (!this.filter.question || this.filter.question =="") ){
      this.resetDates();
    }else 
      this.clearDates();
    
    this.filter.justFeedback = null;
    this.reloadQuestions();
  }

  backList(){
    this.location.back();
  }  

  private resetDates(){
    this.filter.startDates();
    $('#reportrange_right span').html(moment().startOf('month').format('MMMM D, YYYY') + ' - ' + moment().endOf('month').format('MMMM D, YYYY'));
  }

  private clearDates(){
    $('#reportrange_right span').html("");
    this.filter.startDate = null;
    this.filter.endDate = null;
  }

  openDetail(questionId) {
    this._questionService.getQuestion(questionId).subscribe(
      question => this.question = question,
      error => this.errorMessage = error
    );
    this.el.nativeElement.style.width = "100%";
  }
  
  closeDetail() {
    this.el.nativeElement.style.width = "0%";
  }


}
