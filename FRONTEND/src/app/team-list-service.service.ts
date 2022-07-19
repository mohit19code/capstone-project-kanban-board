import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamListServiceService {

  constructor(private _http:HttpClient) { }

  getTeamList():Observable<any>{
    let email=sessionStorage.getItem('email');
    return this._http.get<any>("http://localhost:9000/api/k3/user/team/"+email);
  }

  getUserList():Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k2/users");
  }

  addTeammate(email:any, team:Team):Observable<any>{
    return this._http.post<any>("http://localhost:9000/api/k3/user/team/"+email,team);
  }

  deleteTeammate(teamMemberEmail:any,memberToBeDeleted:any):Observable<any>{
    console.log("DELETE SERVICE");
    return this._http.delete<any>("http://localhost:9000/api/k3/user/team/"+teamMemberEmail+"/"+memberToBeDeleted);
  }
}
