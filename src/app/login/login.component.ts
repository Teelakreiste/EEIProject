import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router,
    private localService: LocalService, private alertService: AlertService) { 
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    /*if (this.userService.isLoggedIn()) {
      this.router.navigate(['/eei/main']);
    }*/

    this.isLogged();
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
      this.alertService.alertError(err.message);
    });
  }

  onRegister() {
    this.router.navigate(['/eei/register']);
  }

}
