import { Component,ViewChild,ElementRef } from '@angular/core';
import {Router} from '@angular/router';


import { User } from '../services/user';
import { LoginService } from '../services/login.service';

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
    return this.loginService.user.login;
  } 

  isLogin():boolean{
    return this.loginService.user!=null;
  }

  isAdmin():boolean{
    return this.loginService.user.role=="ADMIN";
  }

  ngOnInit() {
     //this.url = location.pathname;
  }

  setUrl(value:string){
    this.url = value;
  }
  
}
