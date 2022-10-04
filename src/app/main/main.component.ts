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
  products: Fish[];
  categories;

  constructor(private userService: UserService, 
    private router: Router,
    private localService: LocalService,
    private fishesService: FishesService) { 
      this.categories = this.fishesService.getCategories();
    }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.fishesService.getFishes().subscribe(fishes => {
      this.products = fishes.map(post => {
        return {
          id: post.payload.doc.id,
          ...post.payload.doc.data() as Fish
        }
      })
    }); 
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
