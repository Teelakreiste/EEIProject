import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Address } from '../models/address.model';
import { Company } from '../models/company.model';
import { AddressesService } from '../services/addresses.service';
import { CartService } from '../services/cart.service';
import { CompaniesService } from '../services/companies.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayNow = null;
  todayNext = null;
  address: Address[];
  company: Company[];
  grandTotal !: number;
  cartItems: any = [];
  
  constructor(private cartService: CartService,
    private localStorage: LocalService,
    private companiesService: CompaniesService,
    private addressesSerive: AddressesService) { }
  
  ngOnInit(): void {
    this.todayNow = this.pipe.transform(Date.now(), 'MMMM d, y');
    this.nextMonth();
    this.getCart();
  }

  //get cart
  getCart() {
    this.cartService.getProduct().subscribe((res: any) => {
      this.cartItems = res;
      this.grandTotal = Math.round(this.cartService.getTotalPrice());
    });
  }

  //get company by email
  getEmail() {
    return this.localStorage.getJsonValue('emailUser');
  }

  //get previous month
  previousMonth() {
    this.today.setMonth(this.today.getMonth() - 1);
    this.todayNext = this.pipe.transform(this.today, 'MMMM d, y');
  }

  //get next month
  nextMonth() {
    this.todayNext = this.pipe.transform(this.today.setMonth(this.today.getMonth() + 1), 'MMMM d, y');
  }

  //get current month
  onBack() {
    this.cartService.clearCart();
    window.history.back();
  }
}
