import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KanbanServiceService } from '../kanban-service.service';
import { Team } from '../models/team';
import * as _moment from 'moment';
import { TeamListServiceService } from '../team-list-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NewUser } from '../models/NewUser';
import { DashboardServiceService } from '../dashboard-service.service';

interface Priority {
  value: string;
}

@Component({
  selector: 'app-add-task-dialogue',
  templateUrl: './add-task-dialogue.component.html',
  styleUrls: ['./add-task-dialogue.component.css']
})
export class AddTaskDialogueComponent implements OnInit {

  constructor(private _dashboardService:DashboardServiceService,public dialogRefAdd: MatDialogRef<AddTaskDialogueComponent>,private _kanbanService:KanbanServiceService, private _teamService:TeamListServiceService) {}

  _userList!:Team[];
  generatedTaskId!:any;

  ngOnInit(): void {
    //Working
    this._teamService.getTeamPerName(sessionStorage.getItem('teamName')).subscribe(
      data =>{
        this._userList=data;
      },
      error => {}
    )
    this.generatedTaskId = (Math.floor((Math.random() * 99999) + 1));
  }
  
  priorities: Priority[] = [
    {value: 'HIGH'},{value: 'MEDIUM'},{value: 'LOW'}
  ];
  
  addTaskForm=new FormGroup({
    taskId: new FormControl(this.generatedTaskId),
    taskName: new FormControl('',[Validators.required]),
    taskDescription: new FormControl('',[Validators.required]),
    deadline: new FormControl('',[Validators.required]),
    priority: new FormControl('',[Validators.required]),
    category: new FormControl('todo'),
    assigneeEmail: new FormControl('')
  })

  get taskId(){return this.addTaskForm.get('taskId');}
  get taskName(){return this.addTaskForm.get('taskName');}
  get taskDescription(){return this.addTaskForm.get('taskDescription');}
  get deadline(){return this.addTaskForm.get('deadline');}
  get priority(){return this.addTaskForm.get('priority');}
  get assigneeEmail(){return this.addTaskForm.get('assigneeEmail');}

  _userData!:NewUser;
  // noOfTasks!:number;
  // getNoOfTasks(email:any){
  //   this._dashboardService.getUserDetails(email).subscribe(
  //     data =>{
  //       this._userData=data;
  //       this.noOfTasks=this._userData.numberOfTasks;
  //       console.log("No of tasks get"+this.noOfTasks);
  //     },
  //     error => {}
  //   )
  // }
  
  addTask(){
      let task=this.addTaskForm.value;
      let teamName=sessionStorage.getItem('teamName');
      let assigneeEmail=this.addTaskForm.value.assigneeEmail;
      let noOfTasks=0;
      this._dashboardService.getUserDetails(assigneeEmail).subscribe(
        data =>{
          noOfTasks=data.numberOfTasks;
          if(noOfTasks<4){
            this._kanbanService.addTask(teamName,task).subscribe(
              data =>{},
              error => {
                this._kanbanService.countPlusAdd(assigneeEmail,++noOfTasks).subscribe(
                  data =>{},
                  error => {}
                )
                let response=error.error.text;
                if(response=="Task Saved"){
                  this.dialogRefAdd.close();
                  alert("Task added successfully!");
                  // window.location.reload();
                  let notification="Task : "+this.addTaskForm.value.taskName+" has been added.";
                  // NOTI
                    let assigneeEmail=this.addTaskForm.value.assigneeEmail;
                    this._kanbanService.addNotification(notification, assigneeEmail).subscribe(
                      data =>{},
                      error =>{}
                    )
                }
                else{
                  alert("Task not added!");
                }
              }
            )
          }
          else{
            alert("Team member already occupied with 4 open tasks. Assign to another team member.");
          }
        },
        error => {}
      )
    }

  currentYear = new Date().getFullYear();
  currentDay = new Date();
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const year = (d || new Date()).getFullYear();
    const date = (d || new Date());
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 && year >= this.currentYear && year <= this.currentYear + 1 && date!>=this.currentDay;
  };
}
