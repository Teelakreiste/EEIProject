import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  companyForm: FormGroup;

  nitPattern = '^[0-9]*$';
  phonePattern = /^(\+|\d)[0-9]{7,16}$/;
  zipCodePattern = '^[0-9]*$';
  
  constructor(public userService: UserService,
    private addressesService: AddressesService,
    private companiesService: CompaniesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private localService: LocalService,
    private alertService: AlertService) { 
    this.companyForm = this.createFormGroup();
  }
  
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

  createFormGroup() {
    return this.formBuilder.group({
      nit: new FormControl(null, [Validators.required, Validators.pattern(this.nitPattern)]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(this.phonePattern)]),
      cellphone: new FormControl(null, [Validators.pattern(this.phonePattern)]),
      address: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      address2: new FormControl(null, []),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      zipCode: new FormControl(null, [Validators.required, Validators.pattern(this.zipCodePattern)]),
      country: new FormControl(null, [Validators.required])
    });
  }

  getLocalStorage() {
    // Get the user data from the local storage and set it in the form fields
    const email = this.localService.getSJsonValue('rEmail');
    return email;
  }

  onBack() {
    this.setBackupData();
    this.router.navigate(['/eei/register']);
  }

  setBackupData() {
    this.localService.setSJsonValue('registerData', this.companyForm.value);
  }

  getBackupData() {
    return this.localService.getSJsonValue('registerData');
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
    if (this.companyForm.valid) {
        let address = this.getAdress();
        let company = this.getCompany();
        this.createUser(address, company);
    } else {
      this.alertService.alertError('please fill all the fields');
    }
  }

  createUser(address: Address, company: Company) {
    this.companiesService.createCompany(company).then((res) => {
      address.codCompany = res.id;
      this.addressesService.createAddress(address).then((res) => {
        company.codAddress = res.id;
        this.companiesService.updateCompany(address.codCompany, company).then();
        this.createProfile();
      }).catch((err) => {
        this.alertService.alertError(err.message);
      });
    }).catch((err) => {
      this.alertService.alertError(err.message);
    });
  }

  createProfile() {
    this.userService.register(this.localService.getSJsonValue('rEmail'), this.localService.getSJsonValue('rPassword')).then();
    this.alertService.alertSuccess('Successful registration','The user has been created successfully');
    this.localService.clearToken();
    this.localService.clearSToken();
    this.router.navigate(['/eei/login']);
  }

  get nit() { return this.companyForm.get('nit'); }
  get name() { return this.companyForm.get('name'); }
  get email() { return this.companyForm.get('email'); }
  get phone() { return this.companyForm.get('phone'); }
  get cellphone() { return this.companyForm.get('cellphone'); }
  get address() { return this.companyForm.get('address'); }
  get address2() { return this.companyForm.get('address2'); }
  get city() { return this.companyForm.get('city'); }
  get state() { return this.companyForm.get('state'); }
  get zipCode() { return this.companyForm.get('zipCode'); }
  get country() { return this.companyForm.get('country'); }
}
