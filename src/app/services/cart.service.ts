import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItem: Cart[] = [];
  public productList = new BehaviorSubject<any>([]);
  constructor(private angularFirestore: AngularFirestore,
    private localStorage: LocalService) {
    const userId = this.localStorage.getJsonValue('userId');
    this.angularFirestore.collection('cart').snapshotChanges().subscribe((data: any) => {
      this.cartItem = data.map((a: any) => {
        return {
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        } as Cart;
      });
      this.productList.next(this.cartItem);
    });
  }

  getProduct() {
    return this.productList.asObservable();
  }

  setProduct(products: any) {
    this.cartItem.push(...products);
    this.productList.next(products);
  }

  addToCart(product: any) {
    let productExist = false;
    this.cartItem.map((a: any) => {
      if (product.id === a.id) {
        productExist = true;
        a.quantity += product.quantity;
        a.priceTotal += a.priceTotal / a.quantity;
        this.angularFirestore.collection('cart').doc(product.id).update(a);
      }
    });
    if (!productExist) {
      this.cartItem.push(product);
      this.productList.next(this.cartItem);
      this.getTotalPrice();
      this.angularFirestore.collection('cart').add(product);
    }
    console.log(this.cartItem);
  }

  getTotalPrice(): number {
    let total = 0;
    this.cartItem.map((a: any) => {
      total += parseFloat(a.priceTotal);
    });
    return total;
  }

  removeCantItem(product: any) {
    this.cartItem.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItem.splice(index, 1);
        this.angularFirestore.collection('cart').doc(product.id).delete();
      }
    });
    this.productList.next(this.cartItem);
  }

  removeAllCart() {
    this.cartItem = [];
    this.productList.next(this.cartItem);
  }

  increaseQuantity(product: any) {
    this.cartItem.map((a: any) => {
      if (product.id === a.id) {
        a.quantity++;
        a.priceTotal += a.priceTotal / a.quantity;
        this.angularFirestore.collection('cart').doc(product.id).update(a);
      }
    });
    this.productList.next(this.cartItem);
  }

  decreaseQuantity(product: any) {
    this.cartItem.map((a: any) => {
      if (product.id === a.id) {
        a.quantity--;
        a.priceTotal -= a.priceTotal / a.quantity;
        this.angularFirestore.collection('cart').doc(product.id).update(a);
      }
    });
    this.productList.next(this.cartItem);
  }

  clearCart() {
    this.angularFirestore.collection('cart').get().subscribe((data: any) => {
      data.docs.map((a: any) => {
        this.angularFirestore.collection('cart').doc(a.id).delete();
      });
    });
    this.removeAllCart();
  }
}
