import { Injectable } from '@angular/core';
import { Fish } from '../models/fish.model';
import { FishesService } from './fishes.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  search: string = "";
  productsSearch: Fish[] = null;
  products: Fish[];
  constructor(private fishesService: FishesService) { 
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

  getSearchedProducts(): Fish[] {
    return this.productsSearch;
  }

  filterBySearch() {
    if (this.search.length > 0) {
      this.productsSearch = this.products.filter(product => 
        product.name.toLowerCase().includes(this.search.toLowerCase()) ||
        product.price.toString().toLowerCase().includes(this.search.toLowerCase()));
    } else {
      this.productsSearch = null;
    }
  }

  clearSearch() {
    this.productsSearch = null;
    this.search = null;
  }
}