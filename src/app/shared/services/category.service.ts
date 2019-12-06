import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/admin-category.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private firestore: AngularFirestore) {

  }

  public getCategory(): any {
    return this.firestore.collection('category').snapshotChanges();

  }

}
