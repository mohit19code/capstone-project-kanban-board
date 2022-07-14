import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KanbanServiceService } from '../kanban-service.service';
import { Team } from '../models/team';

interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-task-dialogue',
  templateUrl: './add-task-dialogue.component.html',
  styleUrls: ['./add-task-dialogue.component.css']
})
export class AddTaskDialogueComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private _kanbanService:KanbanServiceService) {}

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  
  _teamList!:Team[];
  reactiveform!: FormGroup;
  
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
  }

  priorities: Priority[] = [
    {value: 'HIGH-0', viewValue: 'HIGH'},
    {value: 'MEDIUM-1', viewValue: 'MEDIUM'},
    {value: 'LOW-2', viewValue: 'LOW'},
  ];

  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });

  addTaskForm=new FormGroup({
    taskName: new FormControl('',[Validators.required]),
    taskDescription: new FormControl('',[Validators.required]),
    deadline: new FormControl('',[Validators.required]),
  })

  minDate!: Date;
  maxDate!: Date;

  get taskName(){
    return this.addTaskForm.get('taskName');
  }
  get taskDescription(){
    return this.addTaskForm.get('taskDescription');
  }
  get deadline(){
    return this.addTaskForm.get('deadline');
  }
  get priority(){
    return this.addTaskForm.get('priority');
  }

  addTask(){
    let email=sessionStorage.getItem('email');
    console.log("Task form : "+JSON.stringify(this.addTaskForm.value));
    // this._kanbanService.addTask(email,this.addTaskForm.value).subscribe(
    //   data =>{
    //     console.log("Tasks received successfully"+JSON.stringify(data));
    //     this._teamList=data;
    //   },
    //   error => {
    //     console.log("This is error in tasks list : "+ error);
    //   }
    // )
  }

}
