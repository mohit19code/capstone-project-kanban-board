import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TeammateDialogueComponent } from '../teammate-dialogue/teammate-dialogue.component';
import { TeamListServiceService } from '../team-list-service.service';
import { Team } from '../models/team';
import { InviteDialogueComponent } from '../invite-dialogue/invite-dialogue.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  constructor(public dialogue: MatDialog, private _teamService:TeamListServiceService) { }

  _teamList!:Team[];
  _userTeamList!:Team[];


  ngOnInit(): void {
    this._teamService.getTeamList().subscribe(
      data =>{
        console.log("Data in teammates"+data);
        this._userTeamList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  // teammates: string[] = ['Shravanth', 'Mohit', 'Ashish'];

  deleteTeammate(memberEmail:any){
    console.log("IN delete methid");
    this._teamService.deleteTeammate(memberEmail).subscribe(
      data =>{
        console.log("Teammate Deleted");
        
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  openDialogue(){
    const dialogue=this.dialogue.open(TeammateDialogueComponent);
    dialogue.afterClosed().subscribe(data => this.ngOnInit);
  }

  openInviteDialogue(){
    const dialogue=this.dialogue.open(InviteDialogueComponent);
    dialogue.afterClosed().subscribe(data => this.ngOnInit);
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
