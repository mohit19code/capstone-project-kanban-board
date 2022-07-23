import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Assignee } from '../models/assignee';
import { Team } from '../models/team';
import { TeamListServiceService } from '../team-list-service.service';

@Component({
  selector: 'app-add-new-team-dialogue',
  templateUrl: './add-new-team-dialogue.component.html',
  styleUrls: ['./add-new-team-dialogue.component.css']
})
export class AddNewTeamDialogueComponent implements OnInit {

  constructor( private _teamService:TeamListServiceService) { }

  _userTeamList!:Team[];


  ngOnInit(): void {
    this._teamService.getUserList().subscribe(
      data =>{
        console.log("Data in teammates"+data);
        this._userTeamList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  _selectedItems=new Array<Assignee>();
  getEmail(event:any,memEmail:any){
    if(event.target.checked){
      let abc={email:memEmail};
      this._selectedItems.push(abc);
    }
    else{
      this._selectedItems=this._selectedItems.filter(m=>m!=memEmail);
    }
  }

  addTeamForm=new FormGroup({
    teamName: new FormControl('',[Validators.required]),
    teamList: new FormControl(this._selectedItems)
  })

  get teamName(){return this.addTeamForm.get('teamName');}
  get teamList(){return this.addTeamForm.get('teamList');}

  addTeam(){
    //Create new team
    let teamList={teamName:this.addTeamForm.value.teamName}

    let newTeam={teamName:this.addTeamForm.value.teamName,teamList:this._selectedItems}
    //Add newly created team
    this._teamService.addNewTeam(newTeam).subscribe(
      data =>{
        console.log("DOWN DATA :"+JSON.stringify(data));
      },
      error =>{
        console.log("DOWN ERROR :"+JSON.stringify(error));
        let response=error.error.text;
        if(response=="Team already exists."){
          alert("Team name already exists, choose a different name.")
        }
        else{
          //Add team name to user
          for(let i=0;i<this._selectedItems.length;i++){
            this._teamService.addTeamNameToUser(teamList, this._selectedItems[i].email).subscribe(
              data =>{
                console.log("UP DATA :"+JSON.stringify(data));
              },
              error =>{
                console.log("UP ERROR :"+JSON.stringify(error));
              }
            )
          }
        }
      }
    )
  }
}
