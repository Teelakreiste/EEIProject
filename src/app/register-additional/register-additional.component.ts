import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AddressesService } from '../services/addresses.service';
import { CompaniesService } from '../services/companies.service';

import  Swal  from 'sweetalert2';
import { Company } from '../models/company.model';
import { Address } from '../models/address.model';

@Component({
  selector: 'app-register-additional',
  templateUrl: './register-additional.component.html',
  styleUrls: ['./register-additional.component.css']
})
export class RegisterAdditionalComponent implements OnInit {
  
  constructor(public userService: UserService,
    private addressesService: AddressesService,
    private companiesService: CompaniesService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.companyForm = this.formBuilder.group({
      nit: '',
      name: '',
      email: '',
      phone: '',
      cellphone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
   });
  }


  companyForm: FormGroup;
  ngOnInit(): void {
    this.companyForm.get('email').setValue(this.userService.email);
  }

  onBack() {
    this.router.navigate(['/eei/register']);
  }

  onSubmit() {
    let address: Address = {
      codCompany: '',
      address: this.companyForm.get('address').value,
      address2: '',
      city: this.companyForm.get('city').value,
      state: this.companyForm.get('state').value,
      zipCode: this.companyForm.get('zipCode').value,
      country: this.companyForm.get('country').value
    }

    let company: Company = {
      email: this.companyForm.get('email').value,
      nit: this.companyForm.get('nit').value,
      name: this.companyForm.get('name').value,
      phone: this.companyForm.get('phone').value,
      cellphone: this.companyForm.get('cellphone').value,
      codAddress: ''
    }
    
    
  }
  
  createUser(address: Address, company: Company) {
    this.companiesService.createCompany(company).then((res) => {
      address.codCompany = res.id;
      this.addressesService.createAddress(address).then((res) => {
        company.codAddress = res.id;
        this.companiesService.updateCompany(address.codCompany, company).then();
        this.userService.register(this.userService.email, this.userService.password).then();
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Se ha registrado correctamente',
          color: '#6C63FF'
        });
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error',
          color: '#6C63FF'
        });
      });
      this.router.navigate(['/eei/login']);
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
        color: '#6C63FF'
      });
    });
  }
}
