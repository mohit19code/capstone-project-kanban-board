import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { KanbanServiceService } from '../kanban-service.service';
import { Tasks } from '../models/tasks';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTaskDialogueComponent } from '../add-task-dialogue/add-task-dialogue.component';
import { EditTaskDialogueComponent } from '../edit-task-dialogue/edit-task-dialogue.component';
import { TeamListServiceService } from '../team-list-service.service';
import { TeamName } from '../models/TeamName';
import { TeamTask } from '../models/TeamTask';
import { Team } from '../models/team';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardServiceService } from '../dashboard-service.service';
import { NewUser } from '../models/NewUser';

interface Priority {
  value: string;
}

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  todo:any[]=[];
  inProgress:any[] =[];
  completed:any[]=[];

  constructor(private _dashboardService:DashboardServiceService,private _kanbanService:KanbanServiceService, private _teamService:TeamListServiceService, public dialogue: MatDialog) { }

  _taskList!: TeamTask[];
  _teamsList!:TeamName[];

  ngOnInit(): void {
    //Working
    this._teamService.getTeamList().subscribe(
      data =>{
        this._teamsList=data;
        if(this._teamsList==null){
          alert("You aren't a part of any team yet. Add team option available in sidenav bar.");
        }
      },
      error => {}
    )
  }


  
  allData!:any;

  getTask(teamName:any){
    sessionStorage.setItem('teamName',teamName);
    //To clear array content
    this.todo=[];
    this.inProgress=[];
    this.completed=[];

    this._kanbanService.getTasks(teamName).subscribe(
      data =>{
        this.allData = JSON.stringify(data);
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
      error => {}
    )
  }
 

  dropCheck(event: CdkDragDrop<TeamTask[]>){
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

  dropToToDo(event: CdkDragDrop<TeamTask[]>) {
    this.dropCheck(event);
    let taskForUpdate=event.container.data[0];
    taskForUpdate.category="todo";
      let teamName=sessionStorage.getItem('teamName'); 
      this._kanbanService.editTask(teamName,taskForUpdate.taskId,taskForUpdate).subscribe(
      data =>{},
      error => {}
    )
  }

  dropToInProgress(event: CdkDragDrop<TeamTask[]>) {
    this.dropCheck(event);
    let taskForUpdate=event.container.data[0];
    taskForUpdate.category="inprogress";
    let teamName=sessionStorage.getItem('teamName'); 
      this._kanbanService.editTask(teamName,taskForUpdate.taskId,taskForUpdate).subscribe(
        data =>{},
        error => {}
      )
  }

  dropToCompleted(event: CdkDragDrop<TeamTask[]>) {
    this.dropCheck(event);
    let taskForUpdate=event.container.data[0];

    if(taskForUpdate.category && taskForUpdate.category=="completed"){
      return ;
    }

    taskForUpdate.category="completed";
    this._dashboardService.getUserDetails(taskForUpdate.assigneeEmail).subscribe(
      data =>{
        console.log("Count : "+data.numberOfTasks);
        this._kanbanService.countPlusAdd(taskForUpdate.assigneeEmail,--data.numberOfTasks).subscribe(
          data =>{},
          error => {}
        )
      }
    )
    let teamName=sessionStorage.getItem('teamName'); 
      this._kanbanService.editTask(teamName,taskForUpdate.taskId,taskForUpdate).subscribe(
        data =>{},
        error => {}
      )
  }

  openAddTaskDialogue(){
    let teamName=sessionStorage.getItem('teamName');
    let dialogue=this.dialogue.open(AddTaskDialogueComponent);
    dialogue.afterClosed().subscribe(data => this.getTask(teamName));
  }

  openEditTaskDialogue(passTaskId:any){
    let teamName=sessionStorage.getItem('teamName');
    let taskId = new MatDialogConfig();
    taskId.data = passTaskId;
    let dialogue=this.dialogue.open(EditTaskDialogueComponent, taskId);
    dialogue.afterClosed().subscribe(data => this.getTask(teamName));
  }

  _teamUserList!:any[];

  deleteTask(taskId:number,assigneeEmail:any,category:any){
    // DELETE
    let teamName=sessionStorage.getItem('teamName');
    this._kanbanService.deleteTask(teamName,taskId).subscribe(
      data =>{},
      error => {
        if(category!="completed"){
          this._dashboardService.getUserDetails(assigneeEmail).subscribe(
            data =>{
              this._kanbanService.countPlusAdd(assigneeEmail,--data.numberOfTasks).subscribe(
                data =>{},
                error => {}
              )
            }
          )
        }
        this.getTask(teamName);
        this._teamService.getTeamPerName(teamName).subscribe(
          data =>{
            this._teamUserList=data;
            for(let i=0;i<this._teamUserList.length;i++){
              let notification="Task with ID : "+taskId+" has been deleted!";
              this._kanbanService.addNotification(notification, this._teamUserList[i].email).subscribe(
                data =>{},
                error =>{}
              )
            }
          }
        )        
      }
    )
  }  

  todoID!:any;
  inprogressID!:any;
  completedID!:any;
  addTaskButtonID!:any;

  HideMethod(){
    this.todoID=document.getElementById("todo");
    this.todoID.style.display = "flex";

    this.inprogressID=document.getElementById("inprogress");
    this.inprogressID.style.display = "flex";

    this.completedID=document.getElementById("completed");
    this.completedID.style.display = "flex";

    this.addTaskButtonID=document.getElementById("addTaskButton")
    this.addTaskButtonID.style.display= "flex";
  }
}