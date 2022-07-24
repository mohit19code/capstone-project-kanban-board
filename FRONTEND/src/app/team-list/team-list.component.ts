import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TeammateDialogueComponent } from '../teammate-dialogue/teammate-dialogue.component';
import { TeamListServiceService } from '../team-list-service.service';
import { Team } from '../models/team';
import { InviteDialogueComponent } from '../invite-dialogue/invite-dialogue.component';
import { AddNewTeamDialogueComponent } from '../add-new-team-dialogue/add-new-team-dialogue.component';
import { TeamName } from '../models/TeamName';
import { KanbanServiceService } from '../kanban-service.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  constructor(public dialogue: MatDialog, private _teamService:TeamListServiceService, private _kanbanService:KanbanServiceService) { }

  _userTeamList!:TeamName[];
  _teamUserList!:any[];

  ngOnInit(): void {
    this._teamService.getTeamList().subscribe(
      data =>{
        this._userTeamList=data;
      },
      error => {}
    )
  }

  getTeam(teamName:any){
    sessionStorage.setItem('teamName', teamName);
    this._teamService.getTeamPerName(teamName).subscribe(
      data =>{
        this._teamUserList=data;
      },
      error => {}
    )
  }

  deleteTeammate(email:any){
    let teamName=sessionStorage.getItem('teamName');
    this._teamService.deleteUserFromTeam(email,teamName).subscribe(
      data =>{},
      error =>{
        //Noti
        let response=error.error.text;
        if(response=="Member is deleted"){
          let notification="You've been removed from "+teamName;
          this._kanbanService.addNotification(notification, email).subscribe(
            data =>{},
            error =>{}
          )
        }
      }
    )
    this._teamService.deleteTeamFromUser(email,teamName).subscribe(
      data =>{},
      error => {}
    )
  }

  openAddTeammateDialogue(){
    const dialogue=this.dialogue.open(TeammateDialogueComponent);
    dialogue.afterClosed().subscribe(data => this.ngOnInit);
  }

  openAddTeamDialogue(){
    const dialogue=this.dialogue.open(AddNewTeamDialogueComponent);
    dialogue.afterClosed().subscribe(data => this.ngOnInit);
  }

  openInviteDialogue(){
    const dialogue=this.dialogue.open(InviteDialogueComponent);
    dialogue.afterClosed().subscribe(data => this.ngOnInit);
  }

  userDivID!:any;
  HideMethod() {  
    this.userDivID = document.getElementById("userDiv");
    this.userDivID.style.display = "block";  //
  }

}