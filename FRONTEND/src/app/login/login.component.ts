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

  constructor(private _loginService: LoginServiceService,  private _router : Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._loginService.userLogin(this.loginForm.value).subscribe(
      data =>{
        console.log("This is data in login : "+ data);
        if(data==null){
          alert("Login failed. Check credentials.")
        }
        else{
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('email', data.email);
          this._router.navigate(['/dashboard']);
        }
      },
      error => {
        console.log("This is error in login : "+ error);
        let ab=JSON.stringify(error);
        console.log("This is error in login stringify : "+ ab);
      }
    )
  }

}
