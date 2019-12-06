import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { IBlog } from 'src/app/shared/interfaces/admin-blog.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  arrBlog: IBlog[];
  constructor(private blogService: BlogService) {
this.getBlog();
  }

  ngOnInit() {
  }
//  public getBlog(): void {
//     this.blogService.getBlog().subscribe(
//       (data: IBlog[]) => {
//         this.arrBlog = data;
//         console.log(this.arrBlog);

//       }
//     );
//   }
private getBlog(): void {
  this.blogService.getBlog().subscribe(
    arrayProd => {
      this.arrBlog = arrayProd.map(prod => {
        return {
          id: prod.payload.doc.id,
          ...prod.payload.doc.data()
        } as IBlog;
      });
      console.log(this.arrBlog);
    }
  );
}

}
