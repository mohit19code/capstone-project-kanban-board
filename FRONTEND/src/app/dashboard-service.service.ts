import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private _http:HttpClient) { }

  getUserDetails(email:any):Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k3/userDetails/"+email);
  }

  getNotificatoins(email:any):Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k4/user/notification/"+email);
  }

  deleteAllNotifications():Observable<any>{
    let email=sessionStorage.getItem('email');
    return this._http.delete<any>("http://localhost:9000/api/k4/user/notification/"+email);
  }
}
