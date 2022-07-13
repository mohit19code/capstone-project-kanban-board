import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invite-dialogue',
  templateUrl: './invite-dialogue.component.html',
  styleUrls: ['./invite-dialogue.component.css']
})
export class InviteDialogueComponent implements OnInit {

  hide=true;

  inviteForm=new FormGroup(
    {
      email: new FormControl('',[Validators.required, Validators.email])
    }
  )

  get email(){
    return this.inviteForm.get('email');
  }

  constructor() { }

  ngOnInit(): void {
  }

  inviteUser(){}
}
