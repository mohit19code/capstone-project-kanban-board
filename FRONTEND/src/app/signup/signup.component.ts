import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators, FormBuilder} from '@angular/forms'

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
      number: new FormControl('',[Validators.required, Validators.pattern('^[6-9]{1}[0-9]{9}$')]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}')])
      // confirmPassword: new FormControl('',[Validators.required])
    }
  )

  get name(){
    return this.signUpForm.get('name');
  }
  get number(){
    return this.signUpForm.get('number');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  // get confirmPassword(){
  //   return this.signUpForm.get('confirmPassword');
  // }
  get f(){
    return this.reactiveform.controls;
  }

  MustMatch(password:any, confirmPassword:any){
    return (formGroup:FormGroup)=>{
      const passwordControl=formGroup.controls[password];
      const confirmPasswordControl=formGroup.controls[confirmPassword];

      if(confirmPasswordControl.errors && !confirmPasswordControl.errors['MustMatch']){
        return;
      }
      if(passwordControl.value!==confirmPasswordControl.value){
        confirmPassword.setErrors({
          MustMatch:true
        })
      }
      else{
        confirmPassword.setErrors(null);
      }
    }
  }
  // constructor(private formBuilder:FormBuilder) { 
  //   this.reactiveform = this.formBuilder.group({
  //     validators:this.MustMatch('password','confirmPassword')
  //   })
  // }

  constructor(){}
  ngOnInit(): void {
  }

  signUpUser(){
    console.log(this.signUpForm.value);
  }
}