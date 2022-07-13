import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KanbanServiceService {

  constructor(private _http:HttpClient) { }

  getTasks(email:any){
    return this._http.get<any>("http://localhost:9000/api/k2/user/tasks/"+email);
  }

  addTask(){

  }

  deleteTask(email:any,taskId:number){
    return this._http.delete<any>("http://localhost:9000/api/k2/user/task/"+email+"/"+taskId);
  }

}
