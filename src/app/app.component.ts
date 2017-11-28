import { Component,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
  url : string;
  
  ngOnInit() {
    this.url = location.pathname;
  }

  setUrl(value:string){
    this.url = value;
  }
  
}
