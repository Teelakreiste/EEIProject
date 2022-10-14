import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fish } from '../models/fish.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any = [];
  grandTotal !: number ;
  constructor(private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.getProduct().subscribe((res: any) => {
      this.cartItems = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  increaseQuantity(product: any) {
    this.cartService.increaseQuantity(product);
  }

  decreaseQuantity(product: any) {
    this.cartService.decreaseQuantity(product);
  }

  removeItem(product: any) {
    this.cartService.removeCantItem(product);
  }

  checkout() {
    this.router.navigate(['/eei/payment/billing']);
  }

  deleteCart() {
    this.cartService.clearCart(); 
  }

  onBack() {
    window.history.back();
  }
}
