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

  addTeammate(team:Team){
    for (let i = 0; i <this._availableUserList.length; i++) {
      let teamMemberEmail=this._availableUserList[i].email;
      console.log("Team member email name "+teamMemberEmail);
      //ADD teammate
      // let email=sessionStorage.getItem('email');
      let newTeam={name:team.name,email:team.email}
      console.log("Team : "+JSON.stringify(newTeam));
      this._teamService.addTeammate(teamMemberEmail,newTeam).subscribe(
        data =>{
          console.log("Data in teammates"+data);
          this._availableUserList=data;
        },
        error => {
          console.log("This is error in tasks list : "+ error);
        }
      )
    }
  }

  inviteTeammate(email:string){
    console.log(email);
  }
}
