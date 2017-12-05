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

  constructor(private loginService : LoginService,
              private service : Service,
              private router: Router) { }

  ngOnInit() {
    if(environment.production)
      this.service.configServer().subscribe(
        server => environment.SERVER_URL = server.server + '/admin'
      )
  }

  login(login:string,password:string){
    const user = new User();
    user.login = login;
    user.password = password;
    this.loginService.login(user).subscribe(
      user => this.forward(user)
    )
  }

  forward(user:User){
    if(user.role) {
      this.router.navigate(['/questions']);
    }else
      this.showSnackBar("Invalid Login or password !");
  }

  showSnackBar(message:String):void{
    this.snackMessage = message;
    this.snackClass = "show";
    setTimeout(()=>this.snackClass = "", 3000);
  }
}
