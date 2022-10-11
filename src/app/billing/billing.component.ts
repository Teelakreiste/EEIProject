import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    this.todayNow = this.pipe.transform(Date.now(), 'MMMM d, y');
    this.nextMonth();
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

}
