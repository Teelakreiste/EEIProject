import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FishesService {

  constructor(private angularFirestore: AngularFirestore) { }

  getCategories() {
    let catergories = [
      'Sea',
      'River',
      'Fish farm',
      'Seafood'
    ];
    return catergories;
  }

  getFishes() {
    return this.angularFirestore.collection('fishes').snapshotChanges();
  }

  getFish(id: string) {
    return this.angularFirestore.collection('fishes').doc(id).valueChanges();
  }

  getFishByCategory(category: string) {
    return this.angularFirestore.collection('fishes', ref => ref.where('category', '==', category)).snapshotChanges();
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
