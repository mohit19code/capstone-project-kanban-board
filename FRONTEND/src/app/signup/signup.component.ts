import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms'
import { SignupServiceService } from '../signup-service.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Team } from '../models/team';
import { TeamListServiceService } from '../team-list-service.service';
import { KanbanServiceService } from '../kanban-service.service';
import { Tasks } from '../models/tasks';
import { first } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  reactiveform!: FormGroup;

  signUpForm=new FormGroup(
    {
      name: new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[A-Za-z ]{1,}$')]),
      mobileNumber: new FormControl('',[Validators.required, Validators.pattern('^[6-9]{1}[0-9]{9}$')]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}')])
    }
  )

  get name(){return this.signUpForm.get('name');}
  get mobileNumber(){return this.signUpForm.get('mobileNumber');}
  get email(){return this.signUpForm.get('email');}
  get password(){return this.signUpForm.get('password');}

  constructor(private _signupService: SignupServiceService , private _router : Router){}
  
  ngOnInit(): void {}

  signUpUser(){
    this._signupService.userSignup(this.signUpForm.value).subscribe(
      data=>{},
      error => {
        let response=error.error.text;
        if(response=="User with email already exists."){
          alert("User already exists! Moving you to LOGIN page.");
          this._router.navigate(['/login']);
        }
        else{
          alert("User sign-up successful!");
          this._router.navigate(['/login']);
        }
      }
    )
  }
}
