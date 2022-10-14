import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fish } from '../models/fish.model';
import { FishesService } from '../services/fishes.service';
import { CartService } from '../services/cart.service';
import { AlertService } from '../services/alert.service';
import { LocalService } from '../services/local.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-info-product',
  templateUrl: './view-info-product.component.html',
  styleUrls: ['./view-info-product.component.css']
})
export class ViewInfoProductComponent implements OnInit {

  quantityForm: FormGroup;
  products: any;
  min: number = 50;
  max: number = 999;
  price: string = '';
  cartItem: any = {
    idUser: '',
    fish: Fish,
    quantity: '',
    priceTotal: ''
  };

  constructor(private router: Router,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private localStorage: LocalService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private fishService: FishesService) {
    this.products = null;
  }

  ngOnInit(): void {
    try {
      this.fishService.getFish(this.getID()).subscribe((data) => {
        this.products = data;
        if (this.products.quantity < 50) {
          this.min = this.products.quantity;
        }
  
        if (this.products.quantity > 999) {
          this.max = this.products.quantity;
        } else {
          this.max = this.products.quantity;
        }
        this.price = Number((this.products.price / (this.products.price % 5 * 7 + 3))).toFixed(4);
      });
      this.quantityForm = this.createFormGroup();
    } catch (error) {
      console.log(error);
    }
  }

  createFormGroup() {
    return this.formBuilder.group({
      quantity: new FormControl('', [Validators.required])
    });
  }

  getID() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  addToCart(item: any) { 
    if (this.quantityForm.value.quantity > item.quantity) {
      this.alertService.alertError('Quantity is not enough');
    } else {
      this.setItem(item);
      this.cartService.addToCart(this.cartItem);
    }
  }

  setItem(item: Fish) {
    this.cartItem.idUser = this.localStorage.getJsonValue('idUser');
    this.cartItem.fish = item;
    this.cartItem.quantity = this.quantityForm.value.quantity;
    this.cartItem.priceTotal = Number((this.cartItem.fish.price / (this.cartItem.fish.price % 5 * 7 + 3)) * this.quantityForm.value.quantity).toFixed(4);
    this.alertService.alertSuccess('ADD TO CART', 'The product has been added to the cart');
  }

  onBack() {
    window.history.back();
  }

  get quantity() { return this.quantityForm.get('quantity'); }
}
