import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from 'src/app/models/board.model';
import {Column} from 'src/app/models/column.model';
@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  board: Board = new Board('Test Board',[
    new Column('To Do',[
      'Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'
    ]),
    new Column('In Progress',[
      '1','2','3'
    ]),
    new Column('Completed',[
      'Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'
    ])
  ])

  constructor() { }

  ngOnInit(): void {
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
}
