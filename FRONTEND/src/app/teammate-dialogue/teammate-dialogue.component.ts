import { Component, OnInit } from '@angular/core';
import { TeamListServiceService } from '../team-list-service.service';
import { Team } from '../models/team';

@Component({
  selector: 'app-teammate-dialogue',
  templateUrl: './teammate-dialogue.component.html',
  styleUrls: ['./teammate-dialogue.component.css']
})
export class TeammateDialogueComponent implements OnInit {

  constructor(private _teamService:TeamListServiceService) { }

  _availableUserList!:Team[];
  
  ngOnInit(): void {
    this._teamService.getUserList().subscribe(
      data =>{
        console.log("Data in teammates"+data);
        this._availableUserList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  teamName=sessionStorage.getItem('teamName');

  addTeammate(email:any){
    console.log("Email :"+email);
    let teamName=sessionStorage.getItem('teamName');
    //Working
    //Add team to user
    //Add team name to user
    let team={email:email}
    this._teamService.addUserToTeam(teamName,team).subscribe(
      data =>{},
      error => {}
    )

    //Add user to team
    // this._teamService.addTeamNameToUser(email,teamName).subscribe(
    //   data =>{},
    //   error => {}
    // )


  }

  inviteTeammate(email:string){
    console.log(email);
  }
}
