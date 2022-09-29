import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-additional',
  templateUrl: './register-additional.component.html',
  styleUrls: ['./register-additional.component.css']
})
export class RegisterAdditionalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBack() {
    this.router.navigate(['/eei/register']);
  }
}
