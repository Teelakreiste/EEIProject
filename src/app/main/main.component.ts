import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = '';
  constructor(private userService: UserService, private router: Router,
    private localService: LocalService) { }

  ngOnInit(): void {
  }

  menuToggle() {
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active');
  }

  logout() {
    this.userService.logout();
    this.localService.clearToken();
    this.refesh();
    this.router.navigate(['/eei/login']);
  }

  refesh() {
    window.location.reload();
  }
}
