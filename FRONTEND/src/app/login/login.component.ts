import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide=true;

  //FormGroup is used with FormControl to track the value and validate the state of form control. 
  // In practice, FormGroup aggregates the values of each child FormControl into a single object, 
  // using each control name as the key.
  
  loginForm=new FormGroup(
    {
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}')]),
    }
  )

  get email(){return this.loginForm.get('email');}

  get password(){return this.loginForm.get('password');}

  constructor(private _loginService: LoginServiceService,  private _router : Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._loginService.userLogin(this.loginForm.value).subscribe(
      data =>{
        if(data==null){
          alert("Login failed. Check credentials.")
        }
        else{
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('email', data.email);
          this._router.navigate(['/dashboard']);
        }
      },
      error => {}
    )
  }

  trialFromSignup(){
    console.log("This is in login from signup");
  }

}
