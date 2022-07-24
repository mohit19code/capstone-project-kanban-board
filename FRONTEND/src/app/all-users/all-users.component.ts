import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InviteDialogueComponent } from '../invite-dialogue/invite-dialogue.component';
import { Team } from '../models/team';
import { TeamListServiceService } from '../team-list-service.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  constructor(public dialogue: MatDialog, private _teamService:TeamListServiceService) { }

  _allUsersList!:Team[];
  ngOnInit(): void {
    this._teamService.getUserList().subscribe(
      data =>{
        this._allUsersList=data;
      },
      error => {}
    )
  }

  openInviteDialogue(){
    const dialogue=this.dialogue.open(InviteDialogueComponent);
    dialogue.afterClosed().subscribe(data => this.ngOnInit);
  }
}
