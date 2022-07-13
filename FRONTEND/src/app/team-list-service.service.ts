import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from './models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamListServiceService {

  constructor(private _http:HttpClient) { }

  getTeamList(){
    let email=sessionStorage.getItem('email');
    console.log("In signup service!");
    return this._http.get<any>("http://localhost:9000/api/k3/user/team/"+email);
  }

  getUserList(){
    return this._http.get<any>("http://localhost:9000/api/k2/users");
  }

  addTeammate(email:any, team:Team){
    console.log("In signup service!");
    return this._http.post<any>("http://localhost:9000/api/k3/user/team/"+email,team);
  }

  deleteTeammate(memberEmail:any){
    console.log("DELETE SER");
    let userEmail=sessionStorage.getItem('email');
    return this._http.delete<any>("http://localhost:9000/api/k3/user/team/"+userEmail+"/"+memberEmail);
  }
}
