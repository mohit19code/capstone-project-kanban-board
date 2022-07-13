import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TeamListServiceService } from '../team-list-service.service';
import { Team } from '../models/team';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-teammate-dialogue',
  templateUrl: './teammate-dialogue.component.html',
  styleUrls: ['./teammate-dialogue.component.css']
})
export class TeammateDialogueComponent implements OnInit {

  constructor(private _teamService:TeamListServiceService, private _dialogue:MatDialog ) { }

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

  teammates: string[] = ['Shravanth', 'Mohit', 'Ashish'];

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

  addTeammate(team:Team){
    // console.log("Team : "+JSON.stringify(team));
    let email=sessionStorage.getItem('email');
    let newTeam={name:team.name,email:team.email,}
    this._teamService.addTeammate(email,newTeam).subscribe(
      data =>{
        console.log("Data in teammates"+data);
        this._availableUserList=data;
        
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  inviteTeammate(email:string){
    console.log(email);
  }
}
