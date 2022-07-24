import { Component, OnInit } from '@angular/core';
import { TeamListServiceService } from '../team-list-service.service';
import { UserTeam } from '../models/UserTeam';
import { KanbanServiceService } from '../kanban-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-teammate-dialogue',
  templateUrl: './teammate-dialogue.component.html',
  styleUrls: ['./teammate-dialogue.component.css']
})
export class TeammateDialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TeammateDialogueComponent>, private _teamService:TeamListServiceService, private _kanbanService:KanbanServiceService) { }

  _availableUserList!:UserTeam[];
  _teamUserListNew!:any[];
  
  teamName=sessionStorage.getItem('teamName');

  ngOnInit(): void {
    this._teamService.getUserList().subscribe(
      data =>{
        this._availableUserList=data;
        this._teamService.getTeamPerName(sessionStorage.getItem('teamName')).subscribe(
          data=>{
            this._teamUserListNew=data;
            for(let i=0;i<this._teamUserListNew.length;i++){
              this._availableUserList=this._availableUserList.filter(x=>x.email!=(this._teamUserListNew[i].email));
            }
          }
        )
      },
      error => {}
    )
  }

  addTeammate(email:any){
    let teamName={teamName:sessionStorage.getItem('teamName')};
    //Add teamName to user
    this._teamService.addTeamNameToUser(teamName,email).subscribe(
      data=>{},
      error=>{}
    )
    
    let simpleTeamName=sessionStorage.getItem('teamName');
    let objectEmail={email:email}
    //Add user to team
    this._teamService.addUserToTeam(simpleTeamName,objectEmail).subscribe(
      data=>{},
      error=>{
        //Noti
        let response=error.error.text;
        if(response=="Member added"){
          alert("Teammate added to "+simpleTeamName+"!");
          this.dialogRef.close();
          let notification="You've been added to "+simpleTeamName;
          this._kanbanService.addNotification(notification, email).subscribe(
            data =>{},
            error =>{}
          )
        }
      }
    )
  }
}