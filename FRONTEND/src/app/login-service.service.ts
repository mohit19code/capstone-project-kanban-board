import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private _http:HttpClient, private _router:Router) { }

  userLogin(user:any):Observable<any>{
    console.log("In login service!");
    return this._http.post<any>("http://localhost:9000/api/k1/login",user);
  }

  goToLoginWhenGuardFailed(){
    this._router.navigate(['/login']);
  }
  
}
