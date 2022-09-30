import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) { 
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).then(res => {
      this.userService.email = this.loginForm.value.email;
      this.router.navigate(['/eei/main']);
    }
    ).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User or password incorrect!',
        footer: 'Please try again'
      });
    });
  }

  onRegister() {
    this.router.navigate(['/eei/register']);
  }

}
