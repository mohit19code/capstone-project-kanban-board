import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KanbanServiceService } from '../kanban-service.service';
import { Assignee } from '../models/assignee';
import { Tasks } from '../models/tasks';
import { Team } from '../models/team';
interface Priority {
  value: string;
}

@Component({
  selector: 'app-edit-task-dialogue',
  templateUrl: './edit-task-dialogue.component.html',
  styleUrls: ['./edit-task-dialogue.component.css']
})
export class EditTaskDialogueComponent implements OnInit {

  constructor(private _kanbanService:KanbanServiceService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  _teamList!:Team[];
  reactiveform!: FormGroup;
  tasks!:Tasks[];
  _task!:Tasks;
  
  ngOnInit(): void {
    this._kanbanService.getTeammates(sessionStorage.getItem('email')).subscribe(
      data =>{
        this._teamList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
    let taskId=this.data;
    console.log("THIS IS TASK ID IN TS :"+taskId);
    this._kanbanService.getTask(taskId).subscribe(
      data =>{
        console.log("Task received successfully"+JSON.stringify(data));
        this._task=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  getTask(){
    let taskId=this.data;
    console.log("THIS IS TASK ID IN TS :"+taskId);
    this._kanbanService.getTask(taskId).subscribe(
      data =>{
        console.log("Task received successfully"+JSON.stringify(data));
        this._task=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }
  
  _selectedItems=new Array<Assignee>();
  getEmail(event:any,memEmail:any,memName:any){
    if(event.target.checked){
      let abc={name:memEmail,email:memName};
      this._selectedItems.push(abc);
    }
    else{
      this._selectedItems=this._selectedItems.filter(m=>m!=memEmail);
    }
    console.log("SELECTED ITEMS: "+JSON.stringify(this._selectedItems));
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
    category: new FormControl('todo'),
    assignee: new FormControl(this._selectedItems)
  })


  get taskId(){return this.editTaskForm.get('taskId');}
  get taskName(){return this.editTaskForm.get('taskName');}
  get taskDescription(){return this.editTaskForm.get('taskDescription');}
  get deadline(){
    return this.editTaskForm.get('deadline');
  }
  get priority(){
    return this.editTaskForm.get('priority');
  }
 
  editTask(taskId:any){
    console.log("In edit task TS");
    console.log("Task update: "+JSON.stringify(this.editTaskForm.value));

    let notification="Task : "+this.editTaskForm.value.taskName+" has been edited.";
    // NOTI
    let assigneeList=this.editTaskForm.value.assignee;
    for (let i = 0; i <assigneeList.length; i++) {
      let assigneeEmail=assigneeList[i].name;
      console.log("Assignee name "+assigneeEmail)
      this._kanbanService.addNotification(notification, assigneeEmail).subscribe(
        data =>{
          console.log("Notification added to "+assigneeEmail);
        },
        error =>{
          console.log("Notification not added.");
        }
      )
    }

    this._kanbanService.editTask(taskId,this.editTaskForm.value).subscribe(
      data =>{
        console.log("Task edited successfully");
        this._teamList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

}
