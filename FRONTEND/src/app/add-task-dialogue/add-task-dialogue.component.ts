import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KanbanServiceService } from '../kanban-service.service';
import { Assignee } from '../models/assignee';
import { Tasks } from '../models/tasks';
import { Team } from '../models/team';
import * as _moment from 'moment';
import { Moment } from 'moment';
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

  constructor(private _kanbanService:KanbanServiceService) {}

  _teamList!:Team[];
  reactiveform!: FormGroup;
  tasks!:Tasks[];

  ngOnInit(): void {
    this._kanbanService.getTeammates(sessionStorage.getItem('email')).subscribe(
      data =>{
        console.log("Tasks received successfully"+JSON.stringify(data));
        this._teamList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
    this.generatedTaskId = (Math.floor((Math.random() * 99999) + 1)).toString();
    
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
    console.log("SELECTED ITEMS: "+JSON.stringify(this._selectedItems));
  }
  
  priorities: Priority[] = [
    {value: 'HIGH'},{value: 'MEDIUM'},{value: 'LOW'}
  ];
  
  addTaskForm=new FormGroup({
    taskId: new FormControl(this.generateTaskId),
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
    console.log("Task form : "+JSON.stringify(this.addTaskForm.value));
    this._kanbanService.addTask(email,this.addTaskForm.value).subscribe(
      data =>{
        console.log("Tasks received successfully"+JSON.stringify(data));
        this._teamList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
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

  generatedTaskId!:any;
  generateTaskId(){
    
  }

}
