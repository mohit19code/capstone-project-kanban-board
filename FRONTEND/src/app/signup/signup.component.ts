import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms'
import { SignupServiceService } from '../signup-service.service';
import { Router } from '@angular/router';

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

  constructor(private _signupService: SignupServiceService,  private _router : Router){}
  ngOnInit(): void {
  }

  signUpUser(){
    this._signupService.userSignup(this.signUpForm.value).subscribe(
      data =>{
        console.log("This is data in signup : "+ data);
        alert("User sign-up succesful!");
        this._router.navigate(['/login']);
      },
      error => {
        console.log("This is error in signup : "+ error);
        alert("User sign-up succesful!")
        this._router.navigate(['/login']);
      }
    )
  }

}



// this._signupService.userSignup(this.name,this.email,this.number,this.password);
// this._signupService.userSignup(this.name,this.email,this.number,this.password).subscribe{
//   (data) => {
//     console.log(response);
//     this._signupService.userSignup();
//   },
//   (error) => {
//     console.log("Exception occured!");
//   }
// }