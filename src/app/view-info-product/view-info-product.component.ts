import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fish } from '../models/fish.model';
import { FishesService } from '../services/fishes.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-view-info-product',
  templateUrl: './view-info-product.component.html',
  styleUrls: ['./view-info-product.component.css']
})
export class ViewInfoProductComponent implements OnInit {

  products: Fish;
  qty: number = 1;

  constructor(private router: Router,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private fishService: FishesService) { 
      this.qty = 50;
      this.products = null;
    }

  ngOnInit(): void {
    this.fishService.getFish(this.getID()).subscribe((data) => {
      this.products = data as Fish;
    });
  }

  getID() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  addToCart(products: Fish) {
    this.alertService.alertSuccess('ADDED','Product added to cart successfully');
  }

}
