import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KanbanServiceService } from '../kanban-service.service';
import { Assignee } from '../models/assignee';
import { Team } from '../models/team';
import { TeamListServiceService } from '../team-list-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TeamListComponent } from '../team-list/team-list.component';

@Component({
  selector: 'app-add-new-team-dialogue',
  templateUrl: './add-new-team-dialogue.component.html',
  styleUrls: ['./add-new-team-dialogue.component.css']
})
export class AddNewTeamDialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddNewTeamDialogueComponent>,private _teamService:TeamListServiceService, private _kanbanService:KanbanServiceService){}

  _userTeamList!:Team[];
  
  ngOnInit(): void {
    this._teamService.getUserList().subscribe(
      data =>{
        this._userTeamList=data;
      },
      error => {}
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
    let teamList={teamName:this.addTeamForm.value.teamName};
    let newTeam={teamName:this.addTeamForm.value.teamName,teamList:this._selectedItems};
    //Add newly created team
    this._teamService.addNewTeam(newTeam).subscribe(
      data =>{},
      error =>{
        let response=error.error.text;
        if(response=="Team already exists."){
          alert("Team name already exists, choose a different name.")
        }
        else{
          alert("Team created.");
          this.dialogRef.close();
          // window.location.reload();
          //Add team name to user
          for(let i=0;i<this._selectedItems.length;i++){
            this._teamService.addTeamNameToUser(teamList, this._selectedItems[i].email).subscribe(
              data =>{},
              error =>{
                //Noti
                let response=error.error.text;
                if(response=="Team member saved."){
                  let notification="You've been added to "+this.addTeamForm.value.teamName;
                  this._kanbanService.addNotification(notification, this._selectedItems[i].email).subscribe(
                    data =>{},
                    error =>{}
                  )
                }
              }
            )
          }
        }
      }
    )
  }
}
