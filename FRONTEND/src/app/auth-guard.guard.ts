import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from './login-service.service';
import { SignupServiceService } from './signup-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private _loginService:LoginServiceService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let status:boolean;
      if(sessionStorage.getItem('token')!=null)
      {
       status=true;
      }
      else{
        this._loginService.goToLoginWhenGuardFailed();
        status=false;
      }
    return status;
  }
}
