import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdditionalComponent } from './register-additional/register-additional.component';
import { MainComponent } from './main/main.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddFishComponent } from './management/add-fish/add-fish.component';

const routes: Routes = [
  { path: 'eei/main', component: MainComponent, ...canActivate(() => redirectUnauthorizedTo(['/eei/login'])) },
  { path: 'eei/login', component: LoginComponent, ...canActivate(() => redirectLoggedInTo(['/eei/main'])) },
  { path: 'eei/register', component: RegisterComponent, ...canActivate(() => redirectLoggedInTo(['/eei/main'])) },
  { path: 'eei/register/additional', component: RegisterAdditionalComponent, ...canActivate(() => redirectLoggedInTo(['/eei/main'])) },
  { path: 'eei/forgot-password', component: ForgotPasswordComponent, ...canActivate(() => redirectLoggedInTo(['/eei/main'])) },
  { path: 'eei/management/add-fish', component: AddFishComponent, ...canActivate(() => redirectUnauthorizedTo(['/eei/login'])) },
  { path: '', redirectTo: '/eei/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/eei/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
