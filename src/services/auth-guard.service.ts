import { Injectable }     from '@angular/core';
import { CanActivate,
         Router, 
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private loginService : LoginService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return true
        /*
        if (this.loginService.isLogged())  
            return true; 

            
        this.loginService.redirectUrl = state.url;
    
        this.router.navigate(['/login']);
        return false;
        */
    }
}