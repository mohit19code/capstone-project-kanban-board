import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  // HttpClient is a built-in service class available in the @angular/common/http package. 
  // It has multiple signature and return types for each request. 
  // It uses the RxJS observable-based APIs, which means it returns the observable and what we need 
  // to subscribe it. 
  
  constructor(private _http:HttpClient, private _router:Router) { }

  userLogin(user:any):Observable<any>{
    console.log("In login service!");
    return this._http.post<any>("http://localhost:9000/api/k1/login",user);
  }

  goToLoginWhenGuardFailed(){
    this._router.navigate(['/login']);
  }
  
}
