import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdditionalComponent } from './register-additional/register-additional.component';
import { MainComponent } from './main/main.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: 'eei/main', component: MainComponent, ...canActivate(() => redirectUnauthorizedTo(['/eei/login'])) },
  { path: 'eei/login', component: LoginComponent, ...canActivate(() => redirectLoggedInTo(['/eei/main'])) },
  { path: 'eei/register', component: RegisterComponent },
  { path: 'eei/register/register-additional', component: RegisterAdditionalComponent },
  { path: '', redirectTo: '/eei/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/eei/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
