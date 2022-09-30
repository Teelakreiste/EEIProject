import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private angularFirestore: AngularFirestore) { }

  async getCompanies() {
    return await this.angularFirestore.collection('companies').get();
  }

  async getCompany(id: string) {
    return await this.angularFirestore.collection('companies').doc(id).get();
  }

  async createCompany(company: any) {
    return await this.angularFirestore.collection('companies').add(company);
  }

  async updateCompany(id: string, company: any) {
    return await this.angularFirestore.collection('companies').doc(id).update(company);
  }

  async deleteCompany(id: string) {
    return await this.angularFirestore.collection('companies').doc(id).delete();
  }
}
