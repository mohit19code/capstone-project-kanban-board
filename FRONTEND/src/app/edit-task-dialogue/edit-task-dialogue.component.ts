import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KanbanServiceService } from '../kanban-service.service';
import { Assignee } from '../models/assignee';
import { Tasks } from '../models/tasks';
import { Team } from '../models/team';
import { TeamTask } from '../models/TeamTask';
import { TeamListServiceService } from '../team-list-service.service';
interface Priority {
  value: string;
}

@Component({
  selector: 'app-edit-task-dialogue',
  templateUrl: './edit-task-dialogue.component.html',
  styleUrls: ['./edit-task-dialogue.component.css']
})
export class EditTaskDialogueComponent implements OnInit {

  constructor(private _kanbanService:KanbanServiceService, private _teamService:TeamListServiceService,@Inject(MAT_DIALOG_DATA) public data: any) {}

  reactiveform!: FormGroup;
  tasks!:Tasks[];
  _task!:TeamTask;
  _userList!:Team[];
  _teamList!:any[];
  
  ngOnInit(): void {
    let teamName=sessionStorage.getItem('teamName');
    this._teamService.getTeamPerName(teamName).subscribe(
      data =>{
        this._teamList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )

    let taskId=this.data;
    console.log("THIS IS TASK ID IN TS :"+taskId);
    this._kanbanService.getTask(teamName,taskId).subscribe(
      data =>{
        console.log("Task received successfully"+JSON.stringify(data));
        this._task=data;
        console.log("Email :"+this._task.assigneeEmail);
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }
  
  priorities: Priority[] = [
    {value: 'HIGH'},
    {value: 'MEDIUM'},
    {value: 'LOW'},
  ];
  
  editTaskForm=new FormGroup({
    taskId: new FormControl(),
    taskName: new FormControl('',[Validators.required]),
    taskDescription: new FormControl('',[Validators.required]),
    deadline: new FormControl('',[Validators.required]),
    priority: new FormControl('',[Validators.required]),
    assigneeEmail: new FormControl('')
  })

  get taskId(){return this.editTaskForm.get('taskId');}
  get taskName(){return this.editTaskForm.get('taskName');}
  get taskDescription(){return this.editTaskForm.get('taskDescription');}
  get deadline(){ return this.editTaskForm.get('deadline');}
  get priority(){return this.editTaskForm.get('priority');}
  get assigneeEmail(){return this.editTaskForm.get('assigneeEmail');}
 
  editTask(taskId:any, category:any){
    this.editTaskForm.value.category=category;
    let teamName=sessionStorage.getItem('teamName');
    this._kanbanService.editTask(teamName,taskId,this.editTaskForm.value).subscribe(
      data =>{
        console.log("Task edited successfully");
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )  
    // let notification="Task : "+this.editTaskForm.value.taskName+" has been edited.";
    // // NOTI
    // let assigneeList=this.editTaskForm.value.assignee;
    // for (let i = 0; i <assigneeList.length; i++) {
    //   let assigneeEmail=assigneeList[i].name;
    //   console.log("Assignee name "+assigneeEmail)
    //   this._kanbanService.addNotification(notification, assigneeEmail).subscribe(
    //     data =>{
    //       console.log("Notification added to "+assigneeEmail);
    //     },
    //     error =>{
    //       console.log("Notification not added.");
    //     }
    //   )
    // }

  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

}
