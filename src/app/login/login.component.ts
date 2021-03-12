import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { LoginService } from '../../services/login.service';
import { Service } from '../../services/service.service';
import { environment } from '../../environments/environment';
import { User } from '../../services/user';

import { USER } from '../../services/consts';

import * as moment from 'moment'


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
    this.autoLogin()
  }

  autoLogin() {
    const localUser : User = JSON.parse(localStorage.getItem(USER));

    if(localUser) {
       if(moment() <= moment(localUser.expiresDate)) {
          const expires= moment(localUser.expiresDate).diff(moment(), 'seconds') 
          localUser.expires = expires
          this.loginService.user = localUser
          this.forward(localUser)
       }else {
          localStorage.removeItem(USER);  
       }
    }

  }

  public logout(){
    this.loginService.logout()
    localStorage.removeItem("url_cash");
    localStorage.removeItem(USER);
  }

  autoLogout(expirates : number):void {
    const timer = setTimeout( () => {
      this.logout();
      clearTimeout(timer);
      this.router.navigate(['login']);
    },expirates * 1000)
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
      this.setUser(user)
      this.router.navigate([this.loginService.redirectUrl]);
    }else{
      this.processing = false;
      this.showSnackBar("Invalid Login or password !");
    }  
  }

  private setUser(user){
    this.autoLogout(user.expires)
    const date = moment()
    user.expiresDate =  date.add(user.expires,'seconds').format()
    localStorage.setItem(USER, JSON.stringify(user));
}


  showSnackBar(message:String):void{
    this.snackMessage = message;
    this.snackClass = "show";
    const timer = setTimeout(()=> {
      this.snackClass = ""
      clearTimeout(timer);
      }, 3000);
  }
  
}
