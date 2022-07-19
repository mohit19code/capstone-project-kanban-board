import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  constructor(private _http:HttpClient) { }

  userSignup(user:any):Observable<any>{
    console.log("In signup service!");
    return this._http.post<any>("http://localhost:9000/api/k2/register",user);
  }
}
