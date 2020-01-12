import { CategoryService } from 'src/app/shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/shared/interfaces/admin-category.interface';
import { IProducts } from 'src/app/shared/interfaces/admin-product.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categoryName: string;
  categories: ICategory[];
  arrProduct: IProducts[];

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router
) {
  this.getProducts();
  this.getCategory();
}

  ngOnInit() {
  }
  btnSmothScroll() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  private getCategory(): void {
    this.categoryService.getCategory().subscribe(
      arrayCat => {
        this.categories = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as ICategory;
        });
      }
    );

  }
  private getProducts(): void {
    this.categoryName = this.route.snapshot.paramMap.get('category');
    this.showCategoryProducts(this.categoryName);
  }

  public showCategoryProducts(name) {
    this.categoryName = name;
    this.productService.getProducts().subscribe(arrayProd => {
        this.arrProduct = arrayProd.map(prod => {
          return {
            id: prod.payload.doc.id,
            ...prod.payload.doc.data()
          } as IProducts;
        });
        this.arrProduct = this.arrProduct.filter(product => {
        return  product.categoryName === this.categoryName;
        });
      }
    );
  }



}
