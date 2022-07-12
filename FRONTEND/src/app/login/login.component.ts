import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide=true;

  loginForm=new FormGroup(
    {
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}')]),
    }
  )

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  constructor() { }

  ngOnInit(): void {
  }

  loginUser(){
    console.log(this.loginForm.value);
  }

}
