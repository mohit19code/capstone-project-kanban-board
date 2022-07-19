import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InviteServiceService {

  constructor(private _http:HttpClient) {}

  inviteUser(fromEmail:any,toEmail:any):Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k5/invite/"+fromEmail+"/"+toEmail);
  }

  forgotPassword(fromEmail:any,toEmail:any):Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k5/forgotPassword/"+fromEmail+"/"+toEmail);
  }

}
