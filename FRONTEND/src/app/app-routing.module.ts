import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { KanbanComponent } from './kanban/kanban.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TeamListComponent } from './team-list/team-list.component';



const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'home',component:HomeComponent},
  {path:'kanban',component:KanbanComponent},
  {path:'teamList',component:TeamListComponent},
  {path:'dashboard',component:DashboardComponent,
  children:[
    { path:'',component:KanbanComponent},
    { path:'kanban',component:KanbanComponent},
    { path:'teamList',component:TeamListComponent}
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
