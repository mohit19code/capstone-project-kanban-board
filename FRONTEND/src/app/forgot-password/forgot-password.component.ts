import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators, FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
import { SignupServiceService } from '../signup-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm=new FormGroup(
    {
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}')])
    }
  )
  get email(){
    return this.forgotForm.get('email');
  }
  get password(){
    return this.forgotForm.get('password');
  }

  constructor(private _signupService: SignupServiceService, private _router : Router) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    let updatedUser={email:this.forgotForm.value.email,password:this.forgotForm.value.password}
    this._signupService.updatePassword(this.forgotForm.value.email,updatedUser).subscribe(
      data =>{
        console.log("Password updated!"+data);
      },
      error => {
        let response=error.error.text;
        if(response=="Password updated!"){
          alert("User password updated!");
          this._router.navigate(['/login']);
        }
        else{
          alert("User does not exist! Check credentials.");
        }
      }
    )
  }

}
