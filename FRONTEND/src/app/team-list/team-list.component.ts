import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TeammateDialogueComponent } from '../teammate-dialogue/teammate-dialogue.component';
import { TeamListServiceService } from '../team-list-service.service';
import { Team } from '../models/team';
import { InviteDialogueComponent } from '../invite-dialogue/invite-dialogue.component';
import { AddNewTeamDialogueComponent } from '../add-new-team-dialogue/add-new-team-dialogue.component';
import { TeamName } from '../models/TeamName';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  constructor(public dialogue: MatDialog, private _teamService:TeamListServiceService) { }

  _userTeamList!:TeamName[];
  _teamUserList!:any[];

  ngOnInit(): void {
    this._teamService.getTeamList().subscribe(
      data =>{
        console.log("USER TEAM LIST : "+JSON.stringify(data));
        this._userTeamList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  getTeam(teamName:any){
    console.log("Team name after click : "+teamName);
    sessionStorage.setItem('teamName', teamName);
    this._teamService.getTeamPerName(teamName).subscribe(
      data =>{
        console.log("List of users in team :"+JSON.stringify(data));
        this._teamUserList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  deleteTeammate(email:any){
    console.log("DELETE EMAIL : "+email);
    console.log("Team name : "+sessionStorage.getItem('teamName'));
    let teamName=sessionStorage.getItem('teamName');
    this._teamService.deleteUserFromTeam(email,teamName).subscribe(
      data =>{},
      error => {}
    )
    this._teamService.deleteTeamFromUser(email,teamName).subscribe(
      data =>{},
      error => {}
    )
  }

  openDialogue(){
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
}




// _teamList!:Team[];
// _allUserList!:Team[];
// this._teamService.deleteTeammate(memberToBeDeleted).subscribe(
    //   data =>{
    //     console.log("List of users in team :"+JSON.stringify(data));
    //     this._teamUserList=data;
    //   },
    //   error => {
    //     console.log("This is error in tasks list : "+ error);
    //   }
    // )



    // for (let i = 0; i <this._allUserList.length; i++) {
    //   let teamMemberEmail=this._allUserList[i].email;
    //   console.log("Team member email name "+teamMemberEmail);
    //   console.log("memberToBeDeleted name "+memberToBeDeleted);
    //    //DELETE
    //   console.log("IN delete methid");
    //   this._teamService.deleteTeammate(teamMemberEmail,memberToBeDeleted).subscribe(
    //     data =>{
    //       console.log("Teammate Deleted");
    //     },
    //     error => {
    //       console.log("This is error in tasks list : "+ error);
    //     }
    //   )
    // }


//FROM ONIIT
       // this._teamService.getUserList().subscribe(
    //   data =>{
    //     console.log("List of users : "+JSON.stringify(data));
    //     this._allUserList=data;
    //   },
    //   error => {
    //     console.log("This is error in tasks list : "+ error);
    //   }
    // )