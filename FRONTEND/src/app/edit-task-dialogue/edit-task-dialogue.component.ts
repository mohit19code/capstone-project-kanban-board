import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KanbanServiceService } from '../kanban-service.service';
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

  constructor(public dialogRefEdit: MatDialogRef<EditTaskDialogueComponent>, private _kanbanService:KanbanServiceService, private _teamService:TeamListServiceService,@Inject(MAT_DIALOG_DATA) public data: any) {}

  _task!:TeamTask;
  _teamList!:any[];
  
  ngOnInit(): void {
    let teamName=sessionStorage.getItem('teamName');
    this._teamService.getTeamPerName(teamName).subscribe(
      data =>{
        this._teamList=data;
      },
      error => {}
    )

    let taskId=this.data;
    this._kanbanService.getTask(teamName,taskId).subscribe(
      data =>{
        this._task=data;
      },
      error => {}
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
      data =>{},
      error => {
        let response=error.error.text;
        if(response=="Task updated"){
          alert("Task edited succesfully!");
          this.dialogRefEdit.close();
          let notification="Task : "+this.editTaskForm.value.taskName+" has been edited.";
          // NOTI
            let assigneeEmail=this.editTaskForm.value.assigneeEmail;
            this._kanbanService.addNotification(notification, assigneeEmail).subscribe(
              data =>{},
              error =>{}
            )
        }
        else{
          alert("Edit not succesful!");
        }
      }
    )  
  }

  closeEditTaskDialogue(){
    this.dialogRefEdit.close();
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
