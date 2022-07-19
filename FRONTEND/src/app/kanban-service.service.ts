import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KanbanServiceService {

  constructor(private _http:HttpClient) { }

  getTasks(email:any):Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k2/user/tasks/"+email);
  }

  getTeammates(email:any):Observable<any>{
    return this._http.get<any>("http://localhost:9000/api/k3/user/team/"+email);
  }

  addTask(email:any,task:any):Observable<any>{
    return this._http.post<any>("http://localhost:9000/api/k2/user/task/"+email,task);
  }

  deleteTask(email:any,taskId:number):Observable<any>{
    return this._http.delete<any>("http://localhost:9000/api/k2/user/task/"+email+"/"+taskId);
  }

  getTask(taskId:any):Observable<any>{
    let email=sessionStorage.getItem('email');
    return this._http.get<any>("http://localhost:9000/api/k2/user/task/"+email+"/"+taskId);
  }

  editTask(email:any,taskId:any,task:any):Observable<any>{
    return this._http.put<any>("http://localhost:9000/api/k2/user/task/"+email+"/"+taskId,task);
  }

  notifyUser(notification:string):Observable<any>{
    let email=sessionStorage.getItem('email');
    return this._http.post<any>("http://localhost:9000/api/k4/user/notification/"+email,notification);
  }

  //Use same for ADD/EDIT
  addNotification(notification:string,email:any):Observable<any>{
    return this._http.post<any>("http://localhost:9000/api/k4/user/notification/"+email,notification);
  }

}
