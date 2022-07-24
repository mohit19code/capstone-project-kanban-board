import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { KanbanServiceService } from '../kanban-service.service';
import { Tasks } from '../models/tasks';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskDialogueComponent } from '../add-task-dialogue/add-task-dialogue.component';
import { EditTaskDialogueComponent } from '../edit-task-dialogue/edit-task-dialogue.component';
import { TeamListServiceService } from '../team-list-service.service';
import { TeamName } from '../models/TeamName';
import { TeamTask } from '../models/TeamTask';

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

  _taskList!: TeamTask[];
  _teamsList!:TeamName[];

  ngOnInit(): void {
    //Working
    this._teamService.getTeamList().subscribe(
      data =>{
        this._teamsList=data;
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
      let teamName=sessionStorage.getItem('teamName'); 
      this._kanbanService.editTask(teamName,taskForUpdate.taskId,taskForUpdate).subscribe(
      data =>{},
      error => {}
    )
  }

  dropToInProgress(event: CdkDragDrop<Tasks[]>) {
    this.dropCheck(event);
    let taskForUpdate=event.container.data[0];
    taskForUpdate.category="inprogress";
    let teamName=sessionStorage.getItem('teamName'); 
      this._kanbanService.editTask(teamName,taskForUpdate.taskId,taskForUpdate).subscribe(
        data =>{},
        error => {}
      )
  }

  dropToCompleted(event: CdkDragDrop<Tasks[]>) {
    this.dropCheck(event);
    let taskForUpdate=event.container.data[0];
    taskForUpdate.category="completed";
    let teamName=sessionStorage.getItem('teamName'); 
      this._kanbanService.editTask(teamName,taskForUpdate.taskId,taskForUpdate).subscribe(
        data =>{},
        error => {}
      )
  }

  openAddTaskDialogue(){
    let dialogue=this.dialogue.open(AddTaskDialogueComponent);
    dialogue.afterClosed().subscribe(data => this.ngOnInit);
  }

  openEditTaskDialogue(passTaskId:any){
    let taskId = new MatDialogConfig();
    taskId.data = passTaskId;
    let dialogue=this.dialogue.open(EditTaskDialogueComponent, taskId);
    dialogue.afterClosed().subscribe(data => this.ngOnInit);
  }

  _teamUserList!:any[];

  deleteTask(taskId:number){
    // DELETE
    let teamName=sessionStorage.getItem('teamName');
    this._kanbanService.deleteTask(teamName,taskId).subscribe(
      data =>{},
      error => {
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