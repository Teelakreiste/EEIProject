import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Fish } from '../models/fish.model';
import { FishesService } from '../services/fishes.service';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SearchService } from '../services/search.service';
import { UserService } from '../services/user.service';
import { LocalService } from '../services/local.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {

  products: Fish[];
  productsSea: Fish[];
  productsRiver: Fish[];
  productsFishFarm: Fish[];
  productsSeaFood: Fish[];
  width: number;
  element: number;
  navigation: boolean;
  newFishShow: boolean = false;
  role = this.localService.getJsonValue('role');

  constructor(private fishesService: FishesService,
    private userService: UserService,
    private searchService: SearchService,
    private localService: LocalService,
    private alertService: AlertService,
    private router: Router) {
    this.calcElemntWidth();
  }

  ngOnInit(): void {
    this.userService.userStatus = this.localService.getJsonValue('role');
    this.fishesService.getCategories().forEach(category => {
      this.getProductsByCategory(category);
    });
    this.getProducts();
  }

  getSearched(): Fish[] {
    return this.searchService.getSearchedProducts();
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

  getProductsByCategory(category: string) {
    this.fishesService.getFishByCategory(category).subscribe(fishes => {
      switch (category) {
        case 'Sea':
          this.productsSea = fishes.map(post => {
            return {
              id: post.payload.doc.id,
              ...post.payload.doc.data() as Fish
            }
          }
          );
          break;
        case 'River':
          this.productsRiver = fishes.map(post => {
            return {
              id: post.payload.doc.id,
              ...post.payload.doc.data() as Fish
            }
          }
          );
          break;
        case 'Fish farm':
          this.productsFishFarm = fishes.map(post => {
            return {
              id: post.payload.doc.id,
              ...post.payload.doc.data() as Fish
            }
          }
          );
          break;
        case 'Seafood':
          this.productsSeaFood = fishes.map(post => {
            return {
              id: post.payload.doc.id,
              ...post.payload.doc.data() as Fish
            }
          }
          );
          break;
      }
    });
  }

  createProduct() {
    this.router.navigate(['/eei/management/add-fish/']);
  }

  updateProduct(id: string) {
    this.router.navigate(['/eei/management/update-fish/' + id]);
  }

  deleteProduct(id: string) {
    this.fishesService.deleteFish(id);
    this.alertService.alertSuccess('REMOVED','Product deleted successfully');
  }

  getRole() {
    return this.userService.userStatus;
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
    } else if (this.width < 1000) {
      this.element = 4.5;
      this.navigation = false;
    } else {
      this.element = 5.3;
      this.navigation = true;
    }
  }

  toggleAddFish() {
    this.newFishShow = !this.newFishShow;
  }

  viewProduct(id: string) {
    this.router.navigate(['/eei/info/product/' + id]);
  }

}
