import { Component, OnInit,ViewChildren,ElementRef,QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnswerDetail } from '../../model/answer.detail';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html'
})
export class AnswerComponent implements OnInit {

  constructor(private _answerService : AnswerService,
              private route: ActivatedRoute) { }
  
  answer:AnswerDetail;
  message: string;
  
  @ViewChildren('divContent') divContent:QueryList<ElementRef>;
            
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id!=0){
      this._answerService.getAnswer(id).subscribe(
        answer => this.answer = answer
      );
    }else
    this.answer = new AnswerDetail(); 
  } 
  

  saveAnswer(answer:AnswerDetail){
    const content = this.divContent.toArray()[0].nativeElement.innerHTML;
    if(content)
      answer.content = content;

    if(answer.isValid()) 
      this._answerService.addAnswer(answer).subscribe(
        result => this.resetAnswer(result)
      );
  }

  private resetAnswer(result){
    if(result && result.number){
      const id = result.number;
      this.message = "Answer ${id} created !";
      this.answer = new AnswerDetail(); 
    }else  
      this.message = null;
  }

}


