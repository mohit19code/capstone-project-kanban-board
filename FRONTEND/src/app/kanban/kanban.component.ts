import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { KanbanServiceService } from '../kanban-service.service';
import { Tasks } from '../models/tasks';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskDialogueComponent } from '../add-task-dialogue/add-task-dialogue.component';
import { EditTaskDialogueComponent } from '../edit-task-dialogue/edit-task-dialogue.component';
import { TeamListServiceService } from '../team-list-service.service';
import { Team } from '../models/team';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  todo:any[]=[];
  inProgress:any[] =[];
  completed:any[]=[];

  constructor(private _kanbanService:KanbanServiceService, private _teamService:TeamListServiceService, public dialogue: MatDialog) { }

  _taskList!: Tasks[];
  _userTeamList!:Team[];

  ngOnInit(): void {
    //Pass team name/ID to get tasks
    this._kanbanService.getTasks(sessionStorage.getItem('email')).subscribe(
      data =>{
        let allData = JSON.stringify(data);
        console.log("Received all tasks: "+allData);
        this._taskList=data;
        for(let i=0;i<data.length;i++)
        {
        if(data[i].category=="todo")
        {
          this.todo.push(data[i]);
        }
        else if(data[i].category=='inprogress')
        {
          this.inProgress.push(data[i]);
        }
        else if(data[i].category=='completed')
        {
          this.completed.push(data[i]);
        }      
      }
        
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )

    this._teamService.getUserList().subscribe(
      data =>{
        this._userTeamList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  getProjectWiseTasks(){
    //Pass team name/ID to get tasks
    this._kanbanService.getTasks(sessionStorage.getItem('email')).subscribe(
      data =>{
        let allData = JSON.stringify(data);
        console.log("Received all tasks: "+allData);
        this._taskList=data;
        for(let i=0;i<data.length;i++)
        {
        if(data[i].category=="todo")
        {
          this.todo.push(data[i]);
        }
        else if(data[i].category=='inprogress')
        {
          this.inProgress.push(data[i]);
        }
        else if(data[i].category=='completed')
        {
          this.completed.push(data[i]);
        }      
      }
        
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  dropCheck(event: CdkDragDrop<Tasks[]>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  dropToToDo(event: CdkDragDrop<Tasks[]>) {
    this.dropCheck(event);
    let taskForUpdate=event.container.data[0];
    taskForUpdate.category="todo";
    for (let i = 0; i <this._userTeamList.length; i++) {
      let teamMemberEmail=this._userTeamList[i].email; 
      this._kanbanService.editTask(teamMemberEmail,taskForUpdate.taskId,taskForUpdate).subscribe(
      data =>{
        console.log("Task moved to TODO successfully");
      },
      error => {
        console.log("This is error in tasks TODO list : "+ error);
      }
    )
    }
  }

  dropToInProgress(event: CdkDragDrop<Tasks[]>) {
    this.dropCheck(event);
    let taskForUpdate=event.container.data[0];
    taskForUpdate.category="inprogress";
    for (let i = 0; i <this._userTeamList.length; i++) {
      let teamMemberEmail=this._userTeamList[i].email; 
      this._kanbanService.editTask(teamMemberEmail,taskForUpdate.taskId,taskForUpdate).subscribe(
        data =>{
          console.log("Task moved to INPROGRESS successfully");
        },
        error => {
          console.log("This is error in tasks TODO list : "+ error);
        }
      )
    }
  }

  dropToCompleted(event: CdkDragDrop<Tasks[]>) {
    this.dropCheck(event);
    let taskForUpdate=event.container.data[0];
    taskForUpdate.category="completed";
    for (let i = 0; i <this._userTeamList.length; i++) {
      let teamMemberEmail=this._userTeamList[i].email; 
      this._kanbanService.editTask(teamMemberEmail,taskForUpdate.taskId,taskForUpdate).subscribe(
        data =>{
          console.log("Task moved to INPROGRESS successfully");
        },
        error => {
          console.log("This is error in tasks TODO list : "+ error);
        }
      )
    }
  }

  openAddTaskDialogue(){
    const dialogue=this.dialogue.open(AddTaskDialogueComponent);
    dialogue.afterClosed().subscribe(data => this.ngOnInit);
  }

  openEditTaskDialogue(passTaskId:any){
    const taskId = new MatDialogConfig();
    taskId.data = passTaskId;
    const dialogue=this.dialogue.open(EditTaskDialogueComponent, taskId);
    dialogue.afterClosed().subscribe(data => this.ngOnInit);
  }

  notification!:string;

  deleteTask(taskId:number){
    for (let i = 0; i <this._userTeamList.length; i++) {
      let teamMemberEmail=this._userTeamList[i].email;
      console.log("Team member email name "+teamMemberEmail);
        // DELETE
      this._kanbanService.deleteTask(teamMemberEmail,taskId).subscribe(
        data =>{
          console.log("Tasks deleted successfully"+JSON.stringify(data));
          this.notification="Deleted";
          this._kanbanService.notifyUser(this.notification).subscribe(
            data =>{
              console.log("Notified!"+this.notification);
            },
            error => {
              console.log("Notificaton failure!"+ error);
            }
          )
        },
        error => {
          console.log("This is error in tasks list : "+ JSON.stringify(error));
        }
      )
    }
  }  
}
