import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { UserService } from '../services/user.service';

import { Fish } from '../models/fish.model';
import { FishesService } from '../services/fishes.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'Welcome to EEI';
  categories;

  constructor(private userService: UserService, 
    private router: Router,
    private localService: LocalService,
    private fishesService: FishesService) { 
      this.categories = this.fishesService.getCategories();
    }

  ngOnInit(): void {
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
