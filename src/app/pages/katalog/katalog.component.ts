import { ICategory } from './../../shared/interfaces/admin-category.interface';
import { CategoryService } from './../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/shared/interfaces/admin-product.interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subject } from 'rxjs';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
  minValue = 200;
  maxValue = 1700;
  options: Options = {
    floor: 0,
    ceil: 2000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + ' грн';
        case LabelType.High:
          return value + ' грн';
        default:
          return value + ' грн';
      }
    }
  };


  categories: ICategory[];
  arrProduct: IProducts[];
  prod: IProducts[] = [];
  categoryName: string;
  goBuy: boolean;
  private subject = new Subject<any>();
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router
) {
this.getCategory();
this.getProducts();
this.router.events.subscribe((event: Event) => {
if (event instanceof NavigationEnd) {
this.getProducts();
}
});

}

  ngOnInit() {

    console.log(this.options);
    if (localStorage.getItem('article')) {
      const basket = JSON.parse(localStorage.getItem('article'));
      this.prod.push(...basket);
    }
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
        console.log(this.categories);
      }
    );
  }
public onSpeedChange(event): void {
  this.arrProduct = this.arrProduct.filter(item => item.price >= event.value && item.price <= event.highValue);

}
  private getProducts(): void {
    this.categoryName = this.route.snapshot.paramMap.get('category');
    this.showCategoryProducts(this.categoryName);
  }

  public showCategoryProducts(name) {
    this.categoryName = name;
    console.log(this.categoryName);
    this.productService.getProducts().subscribe(
      arrayProd => {
        this.arrProduct = arrayProd.map(prod => {
          return {
            id: prod.payload.doc.id,
            ...prod.payload.doc.data()
          } as IProducts;
        });
        this.arrProduct = this.arrProduct.filter(product => product.categoryName === this.categoryName);
        console.log(this.arrProduct);
      }
    );
  }


  public cheapCl(): void {
    this.arrProduct.sort((a, b) => {
      return a.price - b.price;
    });
  }
  public expensiveCl(): void {
    this.arrProduct.sort((a, b) => {
      return b.price - a.price;
    });
  }


  public addBusket(product: IProducts, index: number): void {
    const foundItem = this.prod.find(item => item.id === product.id);
    if (foundItem) {
      foundItem.counter++;
      this.prod.splice(index, 1, foundItem);
    } else {
      product.counter = 1;
      this.prod.push(product);
    }
    const toJson = JSON.stringify(this.prod);
    localStorage.setItem('article', toJson);
    // this.goBuy = true;
  }


}
