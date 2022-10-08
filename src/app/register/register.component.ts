import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LocalService } from '../services/local.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  emailPattern: any = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  passwordPattern: any = /^(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}$/;
  fieldTextType: boolean = false;
  repeatFieldTextType: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localService: LocalService,
    private alertService: AlertService
  ) { 
    this.userForm = this.createFormGroup();
  } 

  ngOnInit(): void {
    if (this.localService.getSJsonValue('rEmail') != null && this.localService.getSJsonValue('rPassword') != null) {
      this.userForm.get('email').setValue(this.localService.getSJsonValue('rEmail'));
      this.userForm.get('password').setValue(this.localService.getSJsonValue('rPassword'));
    }
  }

  createFormGroup() {
    return this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern) , Validators.maxLength(20)]),
      password2: new FormControl(null, [Validators.required])
    },
    {
      validators: this.mustMatch('password', 'password2')
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
        return;
      }
      if(control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onLogin() {
    this.localService.clearSToken();
    this.router.navigate(['/eei/login']);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.saveSesssionSEmail();
      this.onResetForm();
      this.router.navigate(['/eei/register/additional']);
    } else {
      this.alertService.alertError('Invalid form');
    }
  }

  saveSesssionSEmail() {
    if (this.userForm.get('email').value != this.localService.getSJsonValue('rEmail')) {
      this.localService.clearSToken();
    }
    this.localService.setSJsonValue('rEmail', this.userForm.get('email').value);
    this.localService.setSJsonValue('rPassword', this.userForm.get('password').value);
  }

  onResetForm() {
    this.userForm.reset();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  repeatToggleFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get password2() {
    return this.userForm.get('password2');
  }
}
