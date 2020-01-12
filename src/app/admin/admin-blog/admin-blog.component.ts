import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/admin-blog.interface';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/shared/services/blog.service';
import { Blog } from 'src/app/shared/classes/admin-blog.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {
  arrAdminBlog: Array<IBlog> = [];
  blogID: string;
  blogText: string;
  blogDate: string;
  checkText: boolean;
  check: boolean;
  close: boolean;

  editBlogText: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;
  blogImage: string;
  imgID: string;
  constructor(private prStorage: AngularFireStorage,
              private blogService: BlogService,
              private firestore: AngularFirestore
  ) {
    this.getBlogs();
  }

  ngOnInit() {
  }

  private getBlogs(): void {
    this.blogService.getBlog().subscribe(
      arrayCat => {
        this.arrAdminBlog = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as IBlog;
        });
        console.log(this.arrAdminBlog);
      }
    );
  }


  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    data.img = this.blogImage;
    data.imgID = this.imgID;
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('blog').add(data);
    } else {
      this.firestore.doc('blog/' + form.value.id).update(data);
    }
    // this.resetForm();
    // this.closeModal1.nativeElement.click();
  }


  public upload(event): void {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.prStorage.ref(`images/${id}`);
    this.imgID = id;
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => this.blogImage = url);
      })
    ).subscribe();
  }





  public deleteBlog(blog: IBlog,id: string): void {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('blog/' + id).delete();
      const filePath = `/${blog.imgID}`;
      const storageRef = this.prStorage.ref('images/');
      storageRef.child(filePath).delete();
    }
  }

  public editBlog(blog): void {
    this.blogID = blog.id;
    this.editBlogText = blog.text;
    this.imgID = blog.id;
    this.check = true;
    this.checkText = true;
  }

  public saveBlog(): void {
    this.firestore.collection('blog').doc(this.blogID).update({
      id: this.blogID,
      text: this.editBlogText,
      imgID: this.imgID
    });
    this.editBlogText = '';
  }

}
