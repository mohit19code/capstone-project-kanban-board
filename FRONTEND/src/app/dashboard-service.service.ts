import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private _http:HttpClient) { }

  getUserDetails(email:any){
    return this._http.get<any>("http://localhost:9000/api/k2/userDetails/"+email);
  }

  getNotificatoins(email:any){
    return this._http.get<any>("http://localhost:9000/api/k4/user/notification/"+email);
  }

  deleteAllNotifications(){
    let email=sessionStorage.getItem('email');
    return this._http.delete<any>("http://localhost:9000/api/k4/user/notification/"+email);
  }
}
