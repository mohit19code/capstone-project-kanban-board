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


    // //TRIAL ADD
    // this._teamService.getTeamPerName(sessionStorage.getItem('teamName')).subscribe(
    //   data =>{
    //     this._userList=data;
    //   },
    //   error => {}
    // )
    // this.generatedTaskId = (Math.floor((Math.random() * 99999) + 1));

    // // TRIAL EDIT
    // let teamName=sessionStorage.getItem('teamName');
    // this._teamService.getTeamPerName(teamName).subscribe(
    //   data =>{
    //     this._teamList=data;
    //   },
    //   error => {}
    // )

    // let taskId=this.data;
    // this._kanbanService.getTask(teamName,taskId).subscribe(
    //   data =>{
    //     this._task=data;
    //   },
    //   error => {}
    // )
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

  // // TRIAL ADD
  // userAddDivID!:any;
  // HideMethodDiv() {  
  //   this.userAddDivID = document.getElementById("userAddDiv");
  //   this.userAddDivID.style.display = "block";  //
  // }

  // _userList!:Team[];
  // generatedTaskId!:any;

  // priorities: Priority[] = [
  //   {value: 'HIGH'},{value: 'MEDIUM'},{value: 'LOW'}
  // ];
  
  // addTaskForm=new FormGroup({
  //   taskId: new FormControl(this.generatedTaskId),
  //   taskName: new FormControl('',[Validators.required]),
  //   taskDescription: new FormControl('',[Validators.required]),
  //   deadline: new FormControl('',[Validators.required]),
  //   priority: new FormControl('',[Validators.required]),
  //   category: new FormControl('todo'),
  //   assigneeEmail: new FormControl('')
  // })

  // get taskId(){return this.addTaskForm.get('taskId');}
  // get taskName(){return this.addTaskForm.get('taskName');}
  // get taskDescription(){return this.addTaskForm.get('taskDescription');}
  // get deadline(){return this.addTaskForm.get('deadline');}
  // get priority(){return this.addTaskForm.get('priority');}
  // get assigneeEmail(){return this.addTaskForm.get('assigneeEmail');}

  
  // addTask(){
  //     let task=this.addTaskForm.value;
  //     let teamName=sessionStorage.getItem('teamName');
     
  //     this._kanbanService.addTask(teamName,task).subscribe(
  //       data =>{},
  //       error => {
  //         let response=error.error.text;
  //         if(response=="Task Saved"){
  //           this.userAddDivID = document.getElementById("userDivDiv");
  //           this.userAddDivID.style.display = "none";  //
  //           this.getTask(teamName);
  //           alert("Task added successfully!");
  //           let notification="Task : "+this.addTaskForm.value.taskName+" has been added.";
  //           // NOTI
  //             let assigneeEmail=this.addTaskForm.value.assigneeEmail;
  //             this._kanbanService.addNotification(notification, assigneeEmail).subscribe(
  //               data =>{},
  //               error =>{}
  //             )
  //         }
  //         else{
  //           alert("Task not added!");
  //         }
  //       }
  //     )
  //   }

  // currentYear = new Date().getFullYear();
  // currentDay = new Date();
  // myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   const year = (d || new Date()).getFullYear();
  //   const date = (d || new Date());
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6 && year >= this.currentYear && year <= this.currentYear + 1 && date!>=this.currentDay;
  // };

  //TRIAL EDIT
  // _task!:TeamTask;
  // _teamList!:any[];

  // editTaskForm=new FormGroup({
  //   taskId: new FormControl(),
  //   taskName: new FormControl('',[Validators.required]),
  //   taskDescription: new FormControl('',[Validators.required]),
  //   deadline: new FormControl('',[Validators.required]),
  //   priority: new FormControl('',[Validators.required]),
  //   assigneeEmail: new FormControl('')
  // })

  // // get taskId(){return this.editTaskForm.get('taskId');}
  // // get taskName(){return this.editTaskForm.get('taskName');}
  // // get taskDescription(){return this.editTaskForm.get('taskDescription');}
  // // get deadline(){ return this.editTaskForm.get('deadline');}
  // // get priority(){return this.editTaskForm.get('priority');}
  // // get assigneeEmail(){return this.editTaskForm.get('assigneeEmail');}
 
  // editTask(taskId:any, category:any){
  //   this.editTaskForm.value.category=category;
  //   let teamName=sessionStorage.getItem('teamName');
  //   this._kanbanService.editTask(teamName,taskId,this.editTaskForm.value).subscribe(
  //     data =>{},
  //     error => {
  //       let response=error.error.text;
  //       if(response=="Task updated"){
  //         alert("Task edited succesfully!");
  //         // this.dialogRefEdit.close();
  //         // window.location.reload();
  //         this.userEditDivID = document.getElementById("userEditDiv");
  //         this.userEditDivID.style.display = "block";  //
  //         let notification="Task : "+this.editTaskForm.value.taskName+" has been edited.";
  //         // NOTI
  //           let assigneeEmail=this.editTaskForm.value.assigneeEmail;
  //           this._kanbanService.addNotification(notification, assigneeEmail).subscribe(
  //             data =>{},
  //             error =>{}
  //           )
  //       }
  //       else{
  //         alert("Edit not succesful!");
  //       }
  //     }
  //   )  
  // }

  // currentYear = new Date().getFullYear();
  // currentDay = new Date();
  // myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   const year = (d || new Date()).getFullYear();
  //   const date = (d || new Date());
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6 && year >= this.currentYear && year <= this.currentYear + 1 && date!>=this.currentDay;
  // };

  // userEditDivID!:any;
  // HideMethodDivDiv() {  
  //   this.userEditDivID = document.getElementById("userEditDiv");
  //   this.userEditDivID.style.display = "block";  //
  // }

}