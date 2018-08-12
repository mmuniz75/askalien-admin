import { Component,ViewChild,ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from '../services/login.service';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
  url : string;
  
  constructor(private loginService : LoginService,
              private router: Router) {}
 
  logOut(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  getUserName():string{
    return this.loginService.getUser().login;
  } 

  isLogin():boolean{
    return this.loginService.isLogged();
  }

  isAdmin():boolean{
    return this.loginService.isAdmin();
  }

  ngOnInit() {
     this.url = location.pathname!="/"?location.pathname:"/questions";
     if(localStorage.getItem("url_cash"))
        environment.SERVER_URL = localStorage.getItem("url_cash");
  }

  setUrl(value:string){
    this.url = value;
  }
  
}
