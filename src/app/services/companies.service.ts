import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private angularFirestore: AngularFirestore) { }

  getCompanies() {
    return this.angularFirestore.collection('companies').snapshotChanges();
  }

  getCompany(id: string) {
    return this.angularFirestore.collection('companies').doc(id).valueChanges();
  }

  getCompanyByEmail(email: string) {
    return this.angularFirestore.collection('companies', ref => ref.where('email', '==', email)).snapshotChanges();
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
