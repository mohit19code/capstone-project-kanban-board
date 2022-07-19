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
    this._teamService.getUserList().subscribe(
      data =>{
        console.log("Tasks received successfully"+JSON.stringify(data));
        this._userList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
    this.generatedTaskId = (Math.floor((Math.random() * 99999) + 1));
  }
  
  _selectedItems=new Array<Assignee>();
  getEmail(event:any,memEmail:any,memName:any){
    if(event.target.checked){
      let abc={name:memEmail,email:memName};
      this._selectedItems.push(abc);
    }
    else{
      // let abc={name:memEmail,email:memName};
      // this._selectedItems.pop();
      this._selectedItems=this._selectedItems.filter(m=>m!=memEmail);
    }
    // console.log("SELECTED ITEMS: "+JSON.stringify(this._selectedItems));
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
    assignee: new FormControl(this._selectedItems)
  })

  get taskId(){return this.addTaskForm.get('taskId');}
  get taskName(){return this.addTaskForm.get('taskName');}
  get taskDescription(){return this.addTaskForm.get('taskDescription');}
  get deadline(){return this.addTaskForm.get('deadline');}
  get priority(){return this.addTaskForm.get('priority');}
 
  addTask(){
    let email=sessionStorage.getItem('email');

    let notification="Task : "+this.addTaskForm.value.taskName+" has been added.";
    // NOTI
    let assigneeList=this.addTaskForm.value.assignee;
    for (let i = 0; i <assigneeList.length; i++) {
      let assigneeEmail=assigneeList[i].name;
      // console.log("Assignee name "+assigneeEmail)
      this._kanbanService.addNotification(notification, assigneeEmail).subscribe(
        data =>{
          // console.log("Notification added to "+assigneeEmail);
        },
        error =>{
          // console.log("Notification not added.");
        }
      )
    }

    for (let i = 0; i <this._userList.length; i++) {
      let teamMemberEmail=this._userList[i].email;
      this._kanbanService.addTask(teamMemberEmail,this.addTaskForm.value).subscribe(
        data =>{
          console.log("Tasks received successfully"+JSON.stringify(data));
        },
        error => {
          console.log("This is error in add tasks list : "+ error);
        }
      )
    }
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
