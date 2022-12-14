import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamListComponent } from './team-list/team-list.component';

@Injectable({
  providedIn: 'root'
})
export class KanbanServiceService {

  constructor(private _http:HttpClient) { }

  //Working
  addTask(teamName:any,task:any):Observable<any>{
    console.log("Inside add task service");
    return this._http.post<any>("http://localhost:9000/api/k2/team/task/"+teamName,task);
  }

  //Working
  deleteTask(teamName:any,taskId:number):Observable<any>{
    return this._http.delete<any>("http://localhost:9000/api/k2/team/task/"+teamName+"/"+taskId);
  }

  //Working
  getTasks(teamName:any):Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k2/team/tasks/"+teamName);
  }

  //Working
  getTeammates(email:any):Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k3/user/team/"+email);
  }

  //Working
  getTask(teamName:any,taskId:any):Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k2/user/task/"+teamName+"/"+taskId);
  }
  
  //Working
  editTask(teamName:any,taskId:any,task:any):Observable<any>{
    return this._http.put<any>("http://localhost:9000/api/k2/team/task/"+teamName+"/"+taskId,task);
  }
  
  //working
  //Use same for ADD/EDIT
  addNotification(notification:string,email:any):Observable<any>{
    return this._http.post<any>("http://localhost:9000/api/k4/user/notification/"+email,notification);
  }

  countPlusAdd(email:any,count:number):Observable<any>{
    return this._http.post<any>("http://localhost:9000/api/k3/member/noOfTaskAdd/"+email,count);
  }
}
