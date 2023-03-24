import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppRoutes } from './Routes/AppRoutes';

const routes: Routes = [
  { path: AppRoutes.Login, component: LoginComponent }, 
  { path: AppRoutes.SignUp, component: SignupComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
