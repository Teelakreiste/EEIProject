import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  emailPattern: any = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { 
    this.forgotPasswordForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  createFormGroup() {
    return this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)])
    });
  }
  
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      if (this.forgotPasswordForm.get('email').value != null) {
        this.userService.forgotPassword(this.forgotPasswordForm.get('email').value);
        this.alertService.alertInfo('An email has been sent to the address provided with instructions on how to reset your password');
        this.router.navigate(['/eei/login']);
      } else {
        this.alertService.alertError('Please enter an email');
      }

    } else {
      this.alertService.alertError('Please enter a valid email');
    }
  }


  onBack() {
    this.router.navigate(['/eei/login']);
  }

  get email() { return this.forgotPasswordForm.get('email'); }
}
