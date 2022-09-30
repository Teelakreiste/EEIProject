import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FishesService {

  constructor(private angularFirestore: AngularFirestore) { }

  async getFishes() {
    return await this.angularFirestore.collection('fishes').get();
  }

  async getFish(id: string) {
    return await this.angularFirestore.collection('fishes').doc(id).get();
  }

  async createFish(fish: any) {
    return await this.angularFirestore.collection('fishes').add(fish);
  }

  async updateFish(id: string, fish: any) {
    return await this.angularFirestore.collection('fishes').doc(id).update(fish);
  }

  async deleteFish(id: string) {
    return await this.angularFirestore.collection('fishes').doc(id).delete();
  }
  
}
