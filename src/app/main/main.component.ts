import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = '';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.email == null || this.userService.email == '' || this.userService.email == undefined) {
      this.userService.logout();
      this.router.navigate(['/eei/login']);
    } else {
      this.title = this.userService.email;
    }
  }

}
