import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import { IBlog } from './../../shared/interfaces/admin-blog.interface';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
blog: IBlog;
blogId: string;
  constructor(private blogService: BlogService,
              private route: ActivatedRoute,
              private firestore: AngularFirestore) {
                this.getDetBlogs();
               }

  ngOnInit() {
  }

  private getDetBlogs(): any {
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.blogService.getDetailsBlog(this.blogId).subscribe(
      doc => {
        this.blog = doc.data();
        console.log(this.blog);
      }
    );
  }

}
