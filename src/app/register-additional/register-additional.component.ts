import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AddressesService } from '../services/addresses.service';
import { CompaniesService } from '../services/companies.service';

import { Company } from '../models/company.model';
import { Address } from '../models/address.model';
import { LocalService } from '../services/local.service';
import { AlertService } from '../services/alert.service';

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
    private router: Router,
    private localService: LocalService,
    private alertService: AlertService) { 
    this.companyForm = this.formBuilder.group({
      nit: '',
      name: '',
      email: '',
      phone: '',
      cellphone: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
   });
  }
  
  companyForm: FormGroup;
  ngOnInit(): void {
    if (this.getLocalStorage() == null) {
      this.router.navigate(['/eei/register']);
    }
    if(this.getBackupData() != null) {
      this.companyForm.setValue(this.getBackupData());
    }
    else {
      // Get the user data from the local storage and set it in the form fields
      this.companyForm.get('email').setValue(this.getLocalStorage());
    }
  }

  getLocalStorage() {
    // Get the user data from the local storage and set it in the form fields
    const email = this.localService.getJsonValue('rEmail');
    return email;
  }

  onBack() {
    this.setBackupData();
    this.router.navigate(['/eei/register']);
  }

  setBackupData() {
    this.localService.setJsonValue('registerData', this.companyForm.value);
  }

  getBackupData() {
    return this.localService.getJsonValue('registerData');
  }

  private getAdress() {
    let address: Address = {
      codCompany: '',
      address: this.companyForm.get('address').value,
      address2: this.companyForm.get('address2').value,
      city: this.companyForm.get('city').value,
      state: this.companyForm.get('state').value,
      zipCode: this.companyForm.get('zipCode').value,
      country: this.companyForm.get('country').value
    }
    return address;
  }

  private getCompany() {
    let company: Company = {
      email: this.companyForm.get('email').value,
      nit: this.companyForm.get('nit').value,
      name: this.companyForm.get('name').value,
      phone: this.companyForm.get('phone').value,
      cellphone: this.companyForm.get('cellphone').value,
      codAddress: ''
    }
    return company;
  }

  onSubmit() {
    let address = this.getAdress();
    let company = this.getCompany();
    this.createUser(address, company);
  }

  createUser(address: Address, company: Company) {
    this.companiesService.createCompany(company).then((res) => {
      address.codCompany = res.id;
      this.addressesService.createAddress(address).then((res) => {
        company.codAddress = res.id;
        this.companiesService.updateCompany(address.codCompany, company).then();
        this.userService.register(this.localService.getJsonValue('rEmail'), this.localService.getJsonValue('rPassword')).then();
        this.alertService.alertSuccess('Registro exitoso', 'Se ha registrado correctamente');
        this.router.navigate(['/eei/login']);
        this.localService.clearToken();
      }).catch((err) => {
        this.alertService.alertError(err.message);
      });
    }).catch((err) => {
      this.alertService.alertError(err.message);
    });
  }

}
