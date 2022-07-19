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
      mobileNo: new FormControl('',[Validators.required, Validators.pattern('^[6-9]{1}[0-9]{9}$')]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}')])
    }
  )

  get name(){
    return this.signUpForm.get('name');
  }
  get mobileNo(){
    return this.signUpForm.get('mobileNo');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }

  _availableUserList!:Team[];
  _userListForAll!:Team[];

  constructor(private _signupService: SignupServiceService, private _kanbanService:KanbanServiceService , private _router : Router, private _teamService:TeamListServiceService){}
  ngOnInit(): void {
    this._teamService.getUserList().subscribe(
      data =>{
        this._availableUserList=data;
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  user = new User();
  _userTeamList!:Team[];
  _taskList!: Tasks[];
  _passTask!:Tasks;

  signUpUser(){
    this._signupService.userSignup(this.signUpForm.value).subscribe(
      data =>{},
      error => {
        let response=error.error.text;
        if(response=="User with email already exists."){
          alert("User already exists!")
        }
        else{
          //Get tasks
          let emailForTasks=this._availableUserList[0].email;
          this._kanbanService.getTasks(emailForTasks).subscribe(
            data =>{
              this._taskList=data;
               //Add all tasks to new user
              for (let i = 0; i <this._taskList.length; i++) {
                let emailOfUser=this.signUpForm.value.email;
                this._passTask=this._taskList[i];
                console.log("Pass list check loop : "+this._passTask);
                this._kanbanService.addTask(emailOfUser,this._passTask).subscribe(
                  data =>{
                    console.log("Tasks received successfully"+JSON.stringify(data));
                  },
                  error => {
                    console.log("This is error in add tasks list : "+ error);
                  }
                )
              }
              for (let i = 0; i <this._taskList.length; i++) {
                let emailOfUser=this.signUpForm.value.email;
                this._passTask=this._taskList[i];
                console.log("Pass list check loop : "+this._passTask);
                this._kanbanService.addTask(emailOfUser,this._passTask).subscribe(
                  data =>{
                    console.log("Tasks received successfully"+JSON.stringify(data));
                  },
                  error => {
                    console.log("This is error in add tasks list : "+ error);
                  }
                )
              }
            },
            error => {
              console.log("This is error in tasks list : "+ error);
            }
          )
          alert("User sign-up succesful!");
          // this._router.navigate(['/login']);
        }
      }
    )
  }

}


// //Add user to oneself
          // let oneself={name:this.signUpForm.value.name,email:this.signUpForm.value.email}
          // let ownMail=this.signUpForm.value.email;
          // this._teamService.addTeammate(ownMail,oneself).subscribe(
          //   data =>{
          //     console.log("Data in teammates"+data);
          //   },
          //   error => {
          //     console.log("This is error in tasks list : "+ error);
          //   }
          // )

          // // Add user to all users
          // for (let i = 0; i <this._availableUserList.length; i++) {
          //   let teamMemberEmail=this._availableUserList[i].email;
          //   let newTeam={name:this.signUpForm.value.name,email:this.signUpForm.value.email}
          //   this._teamService.addTeammate(teamMemberEmail,newTeam).subscribe(
          //     data =>{
          //       console.log("Data in teammates"+data);
          //     },
          //     error => {
          //       console.log("This is error in tasks list : "+ error);
          //     }
          //   )
          // }

          // //Add all user to new user
          // for (let i = 0; i <this._availableUserList.length; i++) {
          //   let newTeamForNew={name:this._availableUserList[i].name,email:this._availableUserList[i].email}
          //   this._teamService.addTeammate(this.signUpForm.value.email,newTeamForNew).subscribe(
          //     data =>{
          //       console.log("Data in teammates"+data);
          //     },
          //     error => {
          //       console.log("This is error in tasks list : "+ error);
          //     }
          //   )
          // }