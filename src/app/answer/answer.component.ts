import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AnswerDetail } from '../../model/answer.detail';
import { AnswerService } from '../../services/answer.service';
import { MessageService } from '../../services/message.service';

declare var $: any;

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
  
  @ViewChild('divContent') divContent:ElementRef;
            
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id!=0){
      this.answerService.getAnswer(id).subscribe(
        answer => this.answer = answer
      );
    }else
    this.answer = new AnswerDetail(); 
    $.getScript("../../assets/js/custom.min.js");
    $.getScript("../../assets/js/bootstrap-wysiwyg.min.js");
    $.getScript("../../assets/js/jquery.hotkeys.js");
    $.getScript("../../assets/js/prettify.js");
    $.getScript("../../assets/js/validator.js");
  } 
  

  saveAnswer(answer:AnswerDetail){
    const content = this.divContent.nativeElement.innerHTML;
    if(content)
      answer.content = content;

    let id = answer.number;  
    if(this.answerService.isValid(answer)) 

      if(!id) {
        this.answerService.addAnswer(answer).subscribe(
          result => this.resetAnswer(result,id)
        );
      }else{
        this.answerService.updateAnswer(answer).subscribe(
          result => this.resetAnswer(result,id)
        );
      }  
  }

  private resetAnswer(result,id:Number){
    if(result && result.number){
      this.messageService.clear();
      
      if(!id) {
        id = result.number;
        this.showSnackBar(`Answer ${id} created !`);
        this.answer = new AnswerDetail(); 
      }else{
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


