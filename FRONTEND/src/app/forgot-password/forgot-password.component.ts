import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { SignupServiceService } from '../signup-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  hide=true;
  
  forgotForm=new FormGroup(
    {
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}')]),
      OTP: new FormControl('',[Validators.required])
    }
  )
  get email(){return this.forgotForm.get('email');}
  get password(){return this.forgotForm.get('password');}
  get OTP(){return this.forgotForm.get('OTP');}

  constructor(private _signupService: SignupServiceService, private _router : Router) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    if(sessionStorage.getItem('OTP')==this.forgotForm.value.OTP){
      let updatedUser={email:this.forgotForm.value.email,password:this.forgotForm.value.password}
      this._signupService.updatePassword(this.forgotForm.value.email,updatedUser).subscribe(
        data =>{},
        error => {
          let response=error.error.text;
          if(response=="Password updated!"){
            //alert("User password updated!");
            this._router.navigate(['/login']);
          }
          else{
            alert("User does not exist! Check credentials.");
          }
        }
      )
    }
    else{
      alert("Incorrect OTP!");
    }
  }

  sendOTPToEmail(){
    let email=this.forgotForm.value.email;
    let OTP=(Math.floor((Math.random() * 99999) + 1)).toString();
    sessionStorage.setItem('OTP',OTP);
    this._signupService.sendOTP(email,OTP).subscribe()
  }
}
