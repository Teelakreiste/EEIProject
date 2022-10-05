import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Fish } from '../models/fish.model';
import { FishesService } from '../services/fishes.service';
import { LocalService } from '../services/local.service';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {

  products: Fish[];
  width: number;
  element: number;
  navigation: boolean;

  constructor(private localService: LocalService,
    private fishesService: FishesService) {
      this.getProducts();
      this.calcElemntWidth();
  }

  ngOnInit(): void {
  }

  calcElemntWidth() {
    this.width = document.body.clientWidth;
    if (this.width < 400) {
      this.element = 1.5;
      this.navigation = false;
    } else if (this.width < 600) {
      this.element = 2.5;
      this.navigation = false;
    } else if (this.width < 800) {
      this.element = 3.5;
      this.navigation = false;
    } else {
      this.element = 5.3;
      this.navigation = true;
    }
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
}
