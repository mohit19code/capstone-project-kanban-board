import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from 'src/app/models/board.model';
import {Column} from 'src/app/models/column.model';
import { KanbanServiceService } from '../kanban-service.service';
import { Tasks } from '../models/tasks';
import { Team } from '../models/team';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  board: Board = new Board('Test Board',[
    new Column('To Do',[]),
    new Column('In Progress',[]),
    new Column('Completed',[])
  ])

  constructor(private _kanbanService:KanbanServiceService) { }

  ngOnInit(): void {
    this._kanbanService.getTasks(sessionStorage.getItem('email')).subscribe(
      data =>{
        console.log("Tasks received successfully"+JSON.stringify(data));
        this._taskList=data;
        this._teamList=data[0].assignee;
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

  _taskList!: Tasks[];
  _teamList!: Team[];


  addTask(){
    // this._kanbanService.addTask(this.signUpForm.value).subscribe(
    //   data =>{
    //     console.log("This is data in signup : "+ data);
    //     alert("User sign-up succesful!");
    //     this._router.navigate(['/login']);
    //   },
    //   error => {
    //     console.log("This is error in signup : "+ error);
    //     alert("User sign-up succesful!")
    //     this._router.navigate(['/login']);
    //   }
    // )
  }

  deleteTask(taskId:number){
    console.log("Tasks deleted successfully");
    this._kanbanService.deleteTask(sessionStorage.getItem('email'),taskId).subscribe(
      data =>{
        console.log("Tasks deleted successfully"+JSON.stringify(data));
        this._taskList=data;
        this._teamList=data[0].assignee;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }
}
