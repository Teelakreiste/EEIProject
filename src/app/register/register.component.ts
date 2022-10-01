import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';

import { LocalService } from '../services/local.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder, 
    private router: Router,
    private localService: LocalService,
    private alertService: AlertService
  ) { 
    this.userForm = this.formBuilder.group({
      email: '',
      password: '',
      password2: ''
    });
  }

  userForm: FormGroup;
  
  ngOnInit(): void {
    if (this.localService.getJsonValue('rEmail') != null && this.localService.getJsonValue('rPassword') != null) {
      this.userForm.get('email').setValue(this.localService.getJsonValue('rEmail'));
      this.userForm.get('password').setValue(this.localService.getJsonValue('rPassword'));
    }
  }

  onLogin() {
    this.localService.clearToken();
    this.router.navigate(['/eei/login']);
  }

  onSubmit() {
    //this.router.navigate(['/eei/register/register-additional']);
    if (this.userForm.get('password').value != this.userForm.get('password2').value) {
      this.alertService.alertError('Passwords do not match');
    } else {
      if (this.userForm.get('email').value != this.localService.getJsonValue('rEmail')) {
        this.localService.clearToken();
      }
      this.localService.setJsonValue('rEmail', this.userForm.get('email').value);
      this.localService.setJsonValue('rPassword', this.userForm.get('password').value);
      this.router.navigate(['/eei/register/additional']);
    }
  }
}
