import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [{
  path:'', component: HomeComponent, canActivate:[AuthGuard]
},{
  path:'login', component: LoginComponent
},{
  path:'**', redirectTo:''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
