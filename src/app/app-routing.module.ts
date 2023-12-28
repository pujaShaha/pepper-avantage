import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import {authGuard } from './services/auth.guard';
import { PropertyFormComponent } from './property-form/property-form.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
   
  },
  {
    path:'login',
    component: LoginComponent, 
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'property-form',
    component: PropertyFormComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
