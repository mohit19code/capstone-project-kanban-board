import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from 'src/app/models/board.model';
import {Column} from 'src/app/models/column.model';
import { KanbanServiceService } from '../kanban-service.service';
import { Tasks } from '../models/tasks';
import { Team } from '../models/team';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogueComponent } from '../add-task-dialogue/add-task-dialogue.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  // board: Board = new Board('Kanban Board',[
  //   new Column('To Do',[]),
  //   new Column('In Progress',[]),
  //   new Column('Completed',[])
  // ])

  todo:any[]=[];
  inProgress:any[] =[];
  completed:any[]=[];

  constructor(private _kanbanService:KanbanServiceService, public dialogue: MatDialog) { }

  _taskList!: Tasks[];

  ngOnInit(): void {
    this._kanbanService.getTasks(sessionStorage.getItem('email')).subscribe(
      data =>{
        console.log("Tasks received successfully"+JSON.stringify(data));
        let allData = JSON.stringify(data);
        this._taskList=data;
        console.log(this._taskList);
        for(let i=0;i<data.length;i++)
        {
        if(data[i].category=="todo")
        {
          console.log(data[i].category);
          this.todo.push(data[i]);
          console.log(data[i])
        }
        else if(data[i].category=='inprogress')
        {
          console.log(data[i].category);
          this.inProgress.push(data[i]);
          console.log(data[i])
        }
        else if(data[i].category=='completed')
        {
          console.log(data[i].category);
          this.completed.push(data[i]);
          console.log(data[i])
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

  deleteTask(taskId:number){
    console.log("Tasks deleted successfully");
    this._kanbanService.deleteTask(sessionStorage.getItem('email'),taskId).subscribe(
      data =>{
        console.log("Tasks deleted successfully"+JSON.stringify(data));
        this._taskList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }
}
