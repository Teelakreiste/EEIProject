import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { SearchService } from '../services/search.service';
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
    private searchService: SearchService,
    private userService: UserService, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getData();
  }

  logout() {
    this.userService.logout().then(() => {
      this.router.navigate(['/eei/login']);
    }).catch(error => {
      window.alert(error.message);
      console.log(error);
    }).finally(() => {
      window.location.reload();
    });
    
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
    if (this.searchForm.valid) {
      this.searchService.search = this.searchForm.get('search').value;
      if ((this.searchForm.get('search').value == null || this.searchForm.get('search').value == "")) {
        this.searchService.clearSearch();
      } else {
        this.searchService.filterBySearch();
      }
    }
  }

  goToCart() {
    this.router.navigate(['/eei/show/cart']);
  }
}
