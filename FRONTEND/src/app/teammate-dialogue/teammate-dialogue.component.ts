import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-teammate-dialogue',
  templateUrl: './teammate-dialogue.component.html',
  styleUrls: ['./teammate-dialogue.component.css']
})
export class TeammateDialogueComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  teammates: string[] = ['Shravanth', 'Mohit', 'Ashish'];

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

  inviteTeammate(email:string){
    console.log(email);
  }
}
