import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { KanbanServiceService } from '../kanban-service.service';
import { Tasks } from '../models/tasks';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskDialogueComponent } from '../add-task-dialogue/add-task-dialogue.component';
import { EditTaskDialogueComponent } from '../edit-task-dialogue/edit-task-dialogue.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  todo:any[]=[];
  inProgress:any[] =[];
  completed:any[]=[];

  constructor(private _kanbanService:KanbanServiceService, public dialogue: MatDialog) { }

  _taskList!: Tasks[];

  ngOnInit(): void {
    this._kanbanService.getTasks(sessionStorage.getItem('email')).subscribe(
      data =>{
        let allData = JSON.stringify(data);
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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
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
    this._kanbanService.deleteTask(taskId).subscribe(
      data =>{
        console.log("Tasks deleted successfully"+JSON.stringify(data));
        this.notification="Deleted";
        this._kanbanService.notifyUser(this.notification).subscribe(
          data =>{
            console.log("Notified!"+this.notification);
          },
          error => {
            console.log("Notificaton failure!"+ error);
          }
        )
      },
      error => {
        console.log("This is error in tasks list : "+ JSON.stringify(error));
      }
    )
  }
}
