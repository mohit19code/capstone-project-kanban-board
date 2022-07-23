import { Component, OnInit } from '@angular/core';
import { TeamListServiceService } from '../team-list-service.service';
import { TeamNew } from '../models/TeamNew';
import { UserTeam } from '../models/UserTeam';

@Component({
  selector: 'app-teammate-dialogue',
  templateUrl: './teammate-dialogue.component.html',
  styleUrls: ['./teammate-dialogue.component.css']
})
export class TeammateDialogueComponent implements OnInit {

  constructor(private _teamService:TeamListServiceService) { }

  _availableUserList!:UserTeam[];
  _filteredTeamList!:TeamNew[];
  _teamUserListNew!:any[];
  _newList!:TeamNew[];
  
  teamName=sessionStorage.getItem('teamName');

  ngOnInit(): void {
    this._teamService.getUserList().subscribe(
      data =>{
        this._availableUserList=data;
        console.log("User list "+JSON.stringify(this._availableUserList));
        this._teamService.getTeamPerName(sessionStorage.getItem('teamName')).subscribe(
          data=>{
            this._teamUserListNew=data;
            for(let i=0;i<this._teamUserListNew.length;i++){
              this._availableUserList=this._availableUserList.filter(x=>x.email!=(this._teamUserListNew[i].email));
            }
            console.log("Team not avaialable list "+JSON.stringify(this._availableUserList));
          }
        )
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
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
      error=>{}
    )

  }


}




// (x=>x.email!=(this._teamUserList[i].email));

// console.log("Email :"+email);
//     let teamName=sessionStorage.getItem('teamName');
//     //Working
//     //Add team to user
//     //Add team name to user
//     let team={teamName:teamName}
//     for(let i=0;i<this._teamUserList.length;i++){
//       this._teamService.addUserToTeam(this._teamUserList[i].email,team).subscribe(
//         data =>{},
//         error => {}
//       )
//     }
//Add user to team
// let teamNameTry={teamName:teamName}
// for(let i=0;i<this._teamUserList.length;i++){
//   this._teamService.addTeamNameToUser(this._teamUserList[i].email,teamNameTry).subscribe(
//     data =>{},
//     error => {}
//   )
// }

// for(let j=0;i<this._teamUserList.length;j++){
//   if(this._availableUserList[i].email!=this._teamUserList[j].email){
//     console.log("J"+this._teamUserList[j].email);
//     // this._filteredTeamList.push(this._teamUserList[j].email);
//   }
// }