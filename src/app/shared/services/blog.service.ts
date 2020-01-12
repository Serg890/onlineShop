import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBlog } from '../interfaces/admin-blog.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private firestore: AngularFirestore) {

  }

  public getBlog(): any {
    return this.firestore.collection('blog').snapshotChanges();

  }
  public getDetailsBlog(id: string): any {
    return this.firestore.collection('blog').doc(id).get();
   }
}
