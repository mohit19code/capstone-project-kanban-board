import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InviteServiceService } from '../invite-service.service';

@Component({
  selector: 'app-invite-dialogue',
  templateUrl: './invite-dialogue.component.html',
  styleUrls: ['./invite-dialogue.component.css']
})
export class InviteDialogueComponent implements OnInit {

  inviteForm=new FormGroup(
    {
      email: new FormControl('',[Validators.required, Validators.email])
    }
  )

  get email(){
    return this.inviteForm.get('email');
  }

  constructor(private _inviteService:InviteServiceService) { }

  ngOnInit(): void {
  }

  inviteUser(){
    let fromEmail=sessionStorage.getItem('email');
    alert("Invite sent!");
    this._inviteService.inviteUser(fromEmail,this.inviteForm.value.email).subscribe(
      data=>{console.log("Invite sent!");},
      error=>{console.log("Invite failed!");}
    )
  }
}
