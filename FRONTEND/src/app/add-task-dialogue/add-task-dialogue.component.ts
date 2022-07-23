import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KanbanServiceService } from '../kanban-service.service';
import { Assignee } from '../models/assignee';
import { Tasks } from '../models/tasks';
import { Team } from '../models/team';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { TeamListServiceService } from '../team-list-service.service';
const moment = _moment;

interface Priority {
  value: string;
}

@Component({
  selector: 'app-add-task-dialogue',
  templateUrl: './add-task-dialogue.component.html',
  styleUrls: ['./add-task-dialogue.component.css']
})
export class AddTaskDialogueComponent implements OnInit {

  constructor(private _kanbanService:KanbanServiceService, private _teamService:TeamListServiceService) {}

  _userList!:Team[];
  reactiveform!: FormGroup;
  tasks!:Tasks[];

  
  generatedTaskId!:any;
  // generateTaskId(){}

  ngOnInit(): void {
    //Working
    this._teamService.getTeamPerName(sessionStorage.getItem('teamName')).subscribe(
      data =>{
        console.log("Team members :"+JSON.stringify(data));
        this._userList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
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

  addTask(){
      let task=this.addTaskForm.value;
      let teamName=sessionStorage.getItem('teamName');
      
      console.log("Team name :"+teamName);
      console.log("Task :"+JSON.stringify(task));      
      this._kanbanService.addTask(teamName,task).subscribe(
        data =>{
          console.log("Tasks received successfully"+JSON.stringify(data));
        },
        error => {
          console.log("This is error in add tasks list : "+ error);
        }
      )
    }

    // let notification="Task : "+this.addTaskForm.value.taskName+" has been added.";
    
    // console.log("Add task trial : "+JSON.stringify(this.addTaskForm.value));
    // // NOTI
    // let assigneeList=this.addTaskForm.value.assignee;
    // for (let i = 0; i <assigneeList.length; i++) {
    //   let assigneeEmail=assigneeList[i].name;
    //   // console.log("Assignee name "+assigneeEmail)
    //   this._kanbanService.addNotification(notification, assigneeEmail).subscribe(
    //     data =>{
    //       console.log("Notification added to "+assigneeEmail);
    //     },
    //     error =>{
    //       console.log("Notification not added.");
    //     }
    //   )
    // }

    // }

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
