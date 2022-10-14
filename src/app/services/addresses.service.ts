import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private angularFirestore: AngularFirestore) { }

  getAddresses() {
    return this.angularFirestore.collection('addresses').snapshotChanges();
  }

  getAddress(id: string) {
    return this.angularFirestore.collection('addresses').doc(id).valueChanges();
  }

  getAddressesByCompanyId(companyId: string) {
    return this.angularFirestore.collection('addresses', ref => ref.where('companyId', '==', companyId)).snapshotChanges();
  }

  async createAddress(address: any) {
    return await this.angularFirestore.collection('addresses').add(address);
  }

  async updateAddress(id: string, address: any) {
    return await this.angularFirestore.collection('addresses').doc(id).update(address);
  }

  async deleteAddress(id: string) {
    return await this.angularFirestore.collection('addresses').doc(id).delete();
  }
  
}
