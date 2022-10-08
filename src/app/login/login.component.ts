import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

import { LocalService } from '../services/local.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  fieldTextType: boolean;
  loginForm: FormGroup;
  emailPattern: any = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  constructor(private userService: UserService, private router: Router,
    private localService: LocalService, private alertService: AlertService) { 
    this.loginForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.isLogged();
  }

  createFormGroup() {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl(null, [Validators.required])
    });
  }

  isLogged() {
    if (this.localService.getJsonValue('loginEmail') != null && this.localService.getJsonValue('loginPassword') != null) {
      this.userService.login({email: this.localService.getJsonValue('loginEmail'), password: this.localService.getJsonValue('loginPassword')}).then(res => {
        this.router.navigate(['/eei/main']);
      });
    }
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).then(res => {
      this.localService.setJsonValue('loginEmail', this.loginForm.get('email').value);
      this.localService.setJsonValue('loginPassword', this.loginForm.get('password').value);
      this.router.navigate(['/eei/main']);
    }).catch(err => {
      this.alertService.alertError(err.message.toString().replace('Firebase: ', '').replace(' (auth/', ' ').replace(').', ''));
    });
  }

  onRegister() {
    this.localService.clearToken();
    this.router.navigate(['/eei/register']);
  }

  onForgotPassword() {
    this.localService.clearToken();
    this.router.navigate(['/eei/forgot-password']);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  get user() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

}
