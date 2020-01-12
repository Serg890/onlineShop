import { ICategory } from './../../shared/interfaces/admin-category.interface';
import { CategoryService } from './../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/shared/interfaces/admin-product.interface';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
  minValue = 200;
  maxValue = 1900;
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
  copyArrProduct: any[];
  prod: IProducts[] = [];
  categoryName: string;
  // goBuy: boolean;
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
      }
    );
  }
  public onSpeedChange(event): void {
    this.copyArrProduct = this.arrProduct.filter(item => item.price >= event.value && item.price <= event.highValue);
  }
  private getProducts(): void {
    this.categoryName = this.route.snapshot.paramMap.get('category');
    this.showCategoryProducts(this.categoryName);
  }

  public showCategoryProducts(name) {
    this.categoryName = name;
    this.productService.getProducts().subscribe(
      arrayProd => {
        this.arrProduct = arrayProd.map(prod => {
          return {
            id: prod.payload.doc.id,
            ...prod.payload.doc.data()
          } as IProducts;
        });
        this.arrProduct = this.arrProduct.filter(product => product.categoryName === this.categoryName);
        this.copyArrProduct = this.arrProduct.slice();
      }
    );
  }


  public cheapCl(): void {
    this.copyArrProduct.sort((a, b) => {
      return a.price - b.price;
    });
  }
  public expensiveCl(): void {
    this.copyArrProduct.sort((a, b) => {
      return b.price - a.price;
    });
  }


  public addBusket(product: IProducts): void {
    const foundItem = this.prod.find(item => item.id === product.id);
    if (foundItem) {
      const findIndex = this.prod.findIndex(item => item.id === product.id);
      foundItem.counter++;
      this.prod.splice(findIndex, 1, foundItem);
    } else {
      this.prod.push(product);
    }
    const toJson = JSON.stringify(this.prod);
    localStorage.setItem('article', toJson);
    // this.goBuy = true;
  }

  // public deleteArticle(product: IProducts, index: number): void {
  //  const data = JSON.parse(localStorage.getItem('article'));
  //  data.find(prod => prod.id === product.id).isBought = false;
  // }
}
