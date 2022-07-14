import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../dashboard-service.service';
import { User } from '../models/user';
import { UserNotifications } from '../models/userNotifications';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // showFiller = false;
  constructor(public dialogue: MatDialog, private _route:Router, private _dashboardService:DashboardServiceService) { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear();
    this._route.navigate(['login']);
  }

  _userData!:User;
  name!:string;
  email!:string;
  mobileNo!:string;

  getUserDetails(){
    this._dashboardService.getUserDetails(sessionStorage.getItem('email')).subscribe(
      data =>{
        this._userData=data;
        this.name=this._userData.name;
        this.email=this._userData.email;
        this.mobileNo=this._userData.mobileNo;
        console.log("DATA : "+this._userData);
        console.log("DATA STRINGIFY : "+JSON.stringify(this._userData));
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  _userNoti!:string[];

  getNotifications(){
    this._dashboardService.getNotificatoins(sessionStorage.getItem('email')).subscribe(
      data =>{
        this._userNoti=data;
        console.log("getNotificatoins : "+this._userNoti);
      },
      error => {
        console.log("This is error in tasks list : "+ error);
      }
    )
  }

  deleteAllNotifications(){
    this._dashboardService.deleteAllNotifications().subscribe(
      data =>{
        console.log("All notifications deleted!");
      },
      error => {
        console.log("Deletion failed!");
      }
    )
  }
}
