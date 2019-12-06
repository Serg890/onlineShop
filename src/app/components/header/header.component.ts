import { ICategory } from './../../shared/interfaces/admin-category.interface';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/admin.interface';
import { IProducts } from 'src/app/shared/interfaces/admin-product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ActivatedRoute, Router  } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('closeModal1', { static: false }) closeModal1: ElementRef;
  @ViewChild('closeModal2', { static: false }) closeModal2: ElementRef;

  users: Array<IUser> = [
    {
      id: 1,
      email: '11',
      password: '11'
    },
  ];

  allProducts: IProducts[] = [];
  loginIn: string;
  passIn: string;
  userLogin: string;
  userEmail: string;
  userPassword: string;
  check: boolean;
  check1: boolean;
  search: string;
  basketArticle: IProducts[] = [];
  count: number;
  categoryName: string;
  categories: ICategory[];
  arrProduct: IProducts[];
  prod: any[] = [];
  lenghts: number;
  buttonOrder: boolean;

  authError: any;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router) {
    this.getProducts();
    this.getCategory();
  }

  ngOnInit() {
    this.getBasketProduct();
    this.getSum();
    console.log(this.basketArticle);
    this.lenghts = this.basketArticle.length;

    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    });
  }

  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
  }

  public getBasketProduct(): void {
    if (localStorage.length) {
      if (localStorage.getItem('article')) {
        this.basketArticle = JSON.parse(localStorage.getItem('article'));
      }
    }
    this.getSum();
    if (this.basketArticle.length) {
      this.buttonOrder = false;
     } else {
      this.buttonOrder = true;

     }
  }

  public getSum(): void {
    this.count = this.basketArticle.reduce((sum, item) => sum + item.counter * item.price, 0);
  }
 public order(): void {
  this.closeModal2.nativeElement.click();
 }

  public minusCl(item: IProducts, index: number): void {
    if (item.counter > 1 ) {
      item.counter--;
      this.count -= item.price;
      this.prod.splice(index, 1, item);
      const toJson = JSON.stringify(this.prod);
      localStorage.setItem('article', toJson);
    }
  }
  public plusCl(item: IProducts, index: number): void {
    item.counter++;
    // tslint:disable-next-line: no-shadowed-variable
    this.count = this.basketArticle.reduce((sum, item) => sum + item.counter * item.price, 0);
    this.prod.splice(index, 1, item);
    const toJson = JSON.stringify(this.prod);
    localStorage.setItem('article', toJson);
  }

  public deleteArticle(i: number): void {
    this.basketArticle = JSON.parse(localStorage.getItem('article'));
    this.basketArticle.splice(i, 1);
    localStorage.setItem('article', JSON.stringify(this.basketArticle));
    this.getSum();
  }


  // ---------------------------------------------------------------------------------------------------------------
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

  // ----------------------------------------------------------------------------------------------------------

  submit(): void {
    if (!this.loginIn || !this.passIn) {
      this.check = true;
      this.check1 = false;
    } else {
      this.users.forEach((user) => {
        if (this.loginIn === '11' && this.passIn === '11') {
          this.closeModal1.nativeElement.click();
          this.router.navigate(['/admin']);
        } else if (this.loginIn === user.email && this.passIn === user.password) {
          this.closeModal1.nativeElement.click();

        } else {
          this.check1 = true;
          this.check = false;
        }
      });
    }

  }













}
