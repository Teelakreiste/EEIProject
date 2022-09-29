import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdditionalComponent } from './register-additional/register-additional.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'eei/login', component: LoginComponent },
  { path: 'eei/register', component: RegisterComponent },
  { path: 'eei/register/register-additional', component: RegisterAdditionalComponent },
  { path: '', redirectTo: '/eei/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/eei/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
