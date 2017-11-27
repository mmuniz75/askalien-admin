import { Component, OnInit,ViewChildren,ElementRef,QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AnswerDetail } from '../../model/answer.detail';
import { AnswerService } from '../../services/answer.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  constructor(private answerService : AnswerService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private location: Location) { }

  
  answer:AnswerDetail;
  snackClass : String;
  snackMessage : String;
  
  @ViewChildren('divContent') divContent:QueryList<ElementRef>;
            
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id!=0){
      this.answerService.getAnswer(id).subscribe(
        answer => this.answer = answer
      );
    }else
    this.answer = new AnswerDetail(); 
  } 
  

  saveAnswer(answer:AnswerDetail){
    const content = this.divContent.toArray()[0].nativeElement.innerHTML;
    if(content)
      answer.content = content;

    let id = answer.number;  
    if(this.answerService.isValid(answer)) 
      this.answerService.addAnswer(answer).subscribe(
        result => this.resetAnswer(result,id)
      );
  }

  private resetAnswer(result,id:Number){
    if(result && result.number){
      this.messageService.clear();
      
      if(!id) {
        id = result.number;
        this.showSnackBar(`Answer ${id} created !`);
        this.answer = new AnswerDetail(); 
      }else{
        this.showSnackBar(`Answer ${id} updated !`);
        this.location.back();
      }  
    }
  }

  showSnackBar(message:String):void{
    this.snackMessage = message;
    this.snackClass = "show";
    setTimeout(()=>this.snackClass = "", 3000);
  }

  backList(){
    this.location.back();
  }

}


