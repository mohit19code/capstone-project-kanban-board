import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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

  showFiller = false;
  constructor(public dialogue: MatDialog) { }

  ngOnInit(): void {
  }

  deleteAllNotifications(){}

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak111111111111111111111111111111111'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
}
