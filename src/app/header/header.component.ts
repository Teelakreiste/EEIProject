import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getData();
  }

  logout() {
    
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null, [])
    });
  }

  getData() {
    this.searchForm.valueChanges
    .pipe(debounceTime(100))
    .subscribe(data => {
      this.search();
    });
  }

  search() {
  }

  goToCart() {
    this.router.navigate(['/eei/show/cart']);
  }
}
