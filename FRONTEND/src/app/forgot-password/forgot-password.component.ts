import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm=new FormGroup(
    {
      email: new FormControl('',[Validators.required, Validators.email])
    }
  )
  get email(){
    return this.forgotForm.get('email');
  }

  constructor() { }

  ngOnInit(): void {
  }

  forgotEmail(){
    console.log(this.forgotForm.value);
  }

}
