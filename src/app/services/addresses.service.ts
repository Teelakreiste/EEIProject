import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private angularFirestore: AngularFirestore) { }

  async getAddresses() {
    return await this.angularFirestore.collection('addresses').get();
  }

  async getAddress(id: string) {
    return await this.angularFirestore.collection('addresses').doc(id).get();
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
