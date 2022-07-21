import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamListServiceService {

  constructor(private _http:HttpClient) { }

  getUserList():Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k3/users");
  }

  getTeams():Observable<any>{
    let email=sessionStorage.getItem('email');
    return this._http.get<any>("http://localhost:9000/api/k3/user/team/"+email);
  }

  addNewTeam(newTeam:any):Observable<any>{
    return this._http.post<any>("http://localhost:9000/api/k2/team/register/",newTeam);
  }

  getTeamList():Observable<any>{
    let email=sessionStorage.getItem('email');
    return this._http.get<any>("http://localhost:9000/api/k3/user/team/"+email);
  }

  getTeamPerName(teamName:any):Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k2/team/member/"+teamName);
  }

  // Delete member from team
  deleteUserFromTeam(email:any,teamName:any):Observable<any>{
    return this._http.delete<any>("http://localhost:9000/api/k2/team/member/"+teamName+"/"+email);
  }

  //Delete team from member
  deleteTeamFromUser(email:any,teamName:any):Observable<any>{
    return this._http.delete<any>("http://localhost:9000/api/k3/delete/team/"+teamName+"/"+email);
  }

  //Add user to team
  addUserToTeam(teamName:any,team:any):Observable<any>{
    return this._http.post<any>("http://localhost:9000/api/k2/team/member/"+teamName,team)
  }

  //Add team to user
  addTeamNameToUser(team:any, email:any):Observable<any>{
    return this._http.post<any>("http://localhost:9000/api/k3/user/team/"+email,team);
  }












  

  addTeammate(email:any, team:Team):Observable<any>{
    return this._http.post<any>("http://localhost:9000/api/k3/user/team/"+email,team);
  }

  //Deletes whole team
  deleteTeam(email:any,teamName:any):Observable<any>{
    console.log("DELETE from team SERVICE");
    return this._http.delete<any>("http://localhost:9000/api/k3/user/team/"+email+"/"+teamName);
  }

}
