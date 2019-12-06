import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private firestore: AngularFirestore) {}


 public getDetailsProduct(id: string): any {
  return this.firestore.collection('products').doc(id).get();
 }

 public getComentar(): any {
  return this.firestore.collection('comentar').snapshotChanges();
 }


}
