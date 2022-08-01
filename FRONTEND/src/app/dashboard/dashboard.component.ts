import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../dashboard-service.service';
import { NewUser } from '../models/NewUser';
import { User } from '../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _route:Router, private _dashboardService:DashboardServiceService) { }

  _userData!:NewUser;
  _userNoti!:string[];
  _notificationCount!:number;

  ngOnInit(): void {
    //Get profile details
    this._dashboardService.getUserDetails(sessionStorage.getItem('email')).subscribe(
      data =>{
        this._userData=data;
      },
      error => {}
    )

    //Get notfications
    this._dashboardService.getNotificatoins(sessionStorage.getItem('email')).subscribe(
      data =>{
        this._userNoti=data;
        this._notificationCount=this._userNoti.length;
      },
      error => {}
    )
  }

  deleteAllNotifications(){
    this._userNoti=[];
    this._notificationCount=0;
    this._dashboardService.deleteAllNotifications().subscribe();
    this.ngOnInit();
  }

  logout(){
    sessionStorage.clear();
    this._route.navigate(['login']);
  }
  
}
