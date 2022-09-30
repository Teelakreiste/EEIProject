import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';

import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder, 
    private router: Router
  ) { 
    this.userForm = this.formBuilder.group({
      email: '',
      password: '',
      password2: ''
    });
  }

  userForm: FormGroup;
  
  ngOnInit(): void {
  }

  onLogin() {
    this.router.navigate(['/eei/login']);
  }

  onSubmit() {
    //this.router.navigate(['/eei/register/register-additional']);
    if (this.userForm.get('password').value != this.userForm.get('password2').value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
        color: '#6C63FF'
      });
    } else {
      this.userService.email = this.userForm.get('email').value;
      this.userService.password = this.userForm.get('password').value;
      this.router.navigate(['/eei/register/register-additional']);
    }
  }
}
