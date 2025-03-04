import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { loginpageGuard } from './guards/loginpage.guard';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent,
    canActivate: [loginpageGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginpageGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
