import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBlog } from '../interfaces/admin-blog.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // private url: string;
  constructor(private firestore: AngularFirestore) {
    // this.url = 'http://localhost:3000/blog';
  }

  public getBlog(): any {
    return this.firestore.collection('blog').snapshotChanges();

  }




  // public getBlogs(): Observable<Array<IBlog>> {
  //   return this.http.get<Array<IBlog>>(this.url);
  // }
  // public addBlogs(blog): Observable<Array<IBlog>> {
  //   return this.http.post<Array<IBlog>>(this.url, blog);
  // }
  // public deleteBlogs(id): Observable<Array<IBlog>> {
  //   return this.http.delete<Array<IBlog>>(`${this.url}/${id}`);
  // }
  // public updateblogs(id, blog): Observable<Array<IBlog>> {
  //   return this.http.put<Array<IBlog>>(`${this.url}/${id}`, blog);
  // }

}
