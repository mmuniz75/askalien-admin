import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { LoginService } from '../../services/login.service';
import { Service } from '../../services/service.service';
import { environment } from '../../environments/environment';
import { User } from '../../services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message:string;
  snackClass : String;
  snackMessage : String;
  processing : Boolean = false ;

  constructor(private loginService : LoginService,
              private service : Service,
              private router: Router) { }

  ngOnInit() {
    this.loginService.wakeServer();
    if(environment.production)
      this.service.configServer().subscribe(
        _ => console.log("server set to " + environment.SERVER_URL)
      )
  }

  login(login:string,password:string){
    this.processing = true;
    const user = new User();
    user.login = login;
    user.password = password;
    this.loginService.login(user).subscribe(
      user => this.forward(user)
    )
  }

  forward(user:User){
    if(user.role) {
       this.router.navigate([this.loginService.redirectUrl]);
    }else
      this.processing = false;
      this.showSnackBar("Invalid Login or password !");
  }

  showSnackBar(message:String):void{
    this.snackMessage = message;
    this.snackClass = "show";
    setTimeout(()=>this.snackClass = "", 3000);
  }
}
