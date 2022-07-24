import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeammateDialogueComponent } from '../teammate-dialogue/teammate-dialogue.component';
import { TeamListServiceService } from '../team-list-service.service';
import { InviteDialogueComponent } from '../invite-dialogue/invite-dialogue.component';
import { AddNewTeamDialogueComponent } from '../add-new-team-dialogue/add-new-team-dialogue.component';
import { TeamName } from '../models/TeamName';
import { KanbanServiceService } from '../kanban-service.service';
import { UserTeam } from '../models/UserTeam';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  constructor(public dialogue: MatDialog, private _teamService:TeamListServiceService, private _kanbanService:KanbanServiceService) { }

  _userTeamList!:TeamName[];
  _teamUserList!:any[];
  // TRIAL
  // _availableUserList!:UserTeam[];
  // _teamUserListNew!:any[];
  // teamName=sessionStorage.getItem('teamName');
  
  ngOnInit(): void {
    this._teamService.getTeamList().subscribe(
      data =>{
        this._userTeamList=data;
      },
      error => {}
    )

    // Trial
    // this._teamService.getUserList().subscribe(
    //   data =>{
    //     this._availableUserList=[];
    //     this._availableUserList=data;
    //     this._teamService.getTeamPerName(sessionStorage.getItem('teamName')).subscribe(
    //       data=>{
    //         this._teamUserListNew=[];
    //         this._teamUserListNew=data;
    //         for(let i=0;i<this._teamUserListNew.length;i++){
    //           this._availableUserList=this._availableUserList.filter(x=>x.email!=(this._teamUserListNew[i].email));
    //         }
    //       }
    //     )
    //   },
    //   error => {}
    // )
  }

  getTeam(teamName:any){
    sessionStorage.setItem('teamName', teamName);
    this._teamService.getTeamPerName(teamName).subscribe(
      data =>{
        this._teamUserList=data;
        console.log("Inside get team of team list");
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
          this.getTeam(teamName);
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
    this.userDivID.style.display = "block";
  }

  // TRIAL
  // userDivDivID!:any;
  // HideMethodDiv() {  
  //   this.userDivDivID = document.getElementById("userDivDiv");
  //   this.userDivDivID.style.display = "block"; 
  // }

  // addTeammate(email:any){
  //   let teamName={teamName:sessionStorage.getItem('teamName')};
  //   //Add teamName to user
  //   this._teamService.addTeamNameToUser(teamName,email).subscribe(
  //     data=>{},
  //     error=>{}
  //   )
    
  //   let simpleTeamName=sessionStorage.getItem('teamName');
  //   let objectEmail={email:email}
  //   //Add user to team
  //   this._teamService.addUserToTeam(simpleTeamName,objectEmail).subscribe(
  //     data=>{},
  //     error=>{
  //       //Noti
  //       let response=error.error.text;
  //       if(response=="Member added"){
  //         alert("Teammate added to "+simpleTeamName+"!");
  //         this.userDivDivID = document.getElementById("userDivDiv");
  //         this.userDivDivID.style.display = "none"; 
  //         this.getTeam(simpleTeamName);
  //         let notification="You've been added to "+simpleTeamName;
  //         this._kanbanService.addNotification(notification, email).subscribe(
  //           data =>{},
  //           error =>{}
  //         )
  //       }
  //     }
  //   )
  // }
}