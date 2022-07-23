import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { KanbanServiceService } from '../kanban-service.service';
import { Tasks } from '../models/tasks';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskDialogueComponent } from '../add-task-dialogue/add-task-dialogue.component';
import { EditTaskDialogueComponent } from '../edit-task-dialogue/edit-task-dialogue.component';
import { TeamListServiceService } from '../team-list-service.service';
import { Team } from '../models/team';
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

  _taskList!: Tasks[];
  _userTeamList!:Team[];
  _teamsList!:TeamName[];

  ngOnInit(): void {
    //Working
    this._teamService.getTeamList().subscribe(
      data =>{
        this._teamsList=data;
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

  allData!:any;

  getTask(teamName:any){
    sessionStorage.setItem('teamName',teamName);
    console.log("Team name: "+teamName);
    
    //To clear array content
    this.todo=[];
    this.inProgress=[];
    this.completed=[];

    this._kanbanService.getTasks(teamName).subscribe(
      data =>{
        this.allData = JSON.stringify(data);
        console.log("Received all tasks: "+this.allData);
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
      let teamName=sessionStorage.getItem('teamName'); 
      this._kanbanService.editTask(teamName,taskForUpdate.taskId,taskForUpdate).subscribe(
      data =>{
        console.log("Task moved to TODO successfully");
      },
      error => {
        console.log("This is error in tasks TODO list : "+ error);
      }
    )
  }

  dropToInProgress(event: CdkDragDrop<Tasks[]>) {
    this.dropCheck(event);
    let taskForUpdate=event.container.data[0];
    taskForUpdate.category="inprogress";
    let teamName=sessionStorage.getItem('teamName'); 
      this._kanbanService.editTask(teamName,taskForUpdate.taskId,taskForUpdate).subscribe(
        data =>{
          console.log("Task moved to INPROGRESS successfully");
        },
        error => {
          console.log("This is error in tasks TODO list : "+ error);
        }
      )
  }

  dropToCompleted(event: CdkDragDrop<Tasks[]>) {
    this.dropCheck(event);
    let taskForUpdate=event.container.data[0];
    taskForUpdate.category="completed";
    let teamName=sessionStorage.getItem('teamName'); 
      this._kanbanService.editTask(teamName,taskForUpdate.taskId,taskForUpdate).subscribe(
        data =>{
          console.log("Task moved to INPROGRESS successfully");
        },
        error => {
          console.log("This is error in tasks TODO list : "+ error);
        }
      )

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
    console.log("Task ID : "+taskId);
    // DELETE
    let teamName=sessionStorage.getItem('teamName');
    console.log("Team name :"+teamName);
    this._kanbanService.deleteTask(teamName,taskId).subscribe(
      data =>{
        // console.log("Tasks deleted successfully"+JSON.stringify(data));
        // this.notification="Deleted";
        // this._kanbanService.notifyUser(this.notification).subscribe(
        //   data =>{
        //     console.log("Notified!"+this.notification);
        //   },
        //   error => {
        //     console.log("Notificaton failure!"+ error);
        //   }
        // )
      },
      error => {
        console.log("This is error in tasks list : "+ JSON.stringify(error));
      }
    )
  }  

  todoID!:any;
  inprogressID!:any;
  completedID!:any;
  addTaskButtonID!:any;
  TestsFunction(){
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




// getProjectWiseTasks(){
//   //Pass team name/ID to get tasks
//   this._kanbanService.getTasks(sessionStorage.getItem('email')).subscribe(
//     data =>{
//       let allData = JSON.stringify(data);
//       console.log("Received all tasks: "+allData);
//       this._taskList=data;
//       for(let i=0;i<data.length;i++)
//       {
//       if(data[i].category=="todo")
//       {
//         this.todo.push(data[i]);
//       }
//       else if(data[i].category=='inprogress')
//       {
//         this.inProgress.push(data[i]);
//       }
//       else if(data[i].category=='completed')
//       {
//         this.completed.push(data[i]);
//       }      
//     }
      
//     },
//     error => {
//       console.log("This is error in tasks list : "+ error);
//     }
//   )
// }