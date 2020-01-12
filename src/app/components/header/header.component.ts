import { ICategory } from './../../shared/interfaces/admin-category.interface';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { IProducts } from 'src/app/shared/interfaces/admin-product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('closeModal1', { static: false }) closeModal1: ElementRef;
  @ViewChild('closeModal2', { static: false }) closeModal2: ElementRef;

  search: string;
  basketArticle: IProducts[] = [];
  count: number;
  categoryName: string;
  categories: ICategory[];
  users: any[] = [];
  arrProduct: IProducts[];
  prod: any[] = [];
  lenghts: number;
  buttonOrder: boolean;
  adminka: boolean;
  user: firebase.User;
  authError: any;
  OpenForm: boolean;
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private Router: Router
              ) {
    this.getProducts();
    this.getCategory();
    this.getUser();
  }

  ngOnInit() {
    this.getBasketProduct();
    this.getSum();
    console.log(this.basketArticle);
    this.lenghts = this.basketArticle.length;

    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
      this.auth.getUserState()
        .subscribe(user => {
          this.user = user;
        });
    });
  }
  routingToAdminPage(){
    this.Router.navigate(['/admin'])
    this.adminka=true
  }

  private getUser(): void {
    this.auth.getUser().subscribe(
      arrayCat => {
        this.users = arrayCat.map(user => {
          return {
            id: user.payload.doc.id,
            ...user.payload.doc.data()
          } as any;
        });
        console.log(this.users);
      }
    );
  }

  public login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
    this.closeModal1.nativeElement.click();
    if (this.users.some(item => item.email === frm.value.email)) {
      this.adminka = true;
     }
  }

  public createUser(frm) {
    this.auth.createUser(frm.value);
  }

  public loginClick(): void {
    this.OpenForm = false;
  }
  public registratorClick(): void {
    this.OpenForm = true;
  }
  public logout(): void {
    this.auth.logout();
    localStorage.clear();
    this.basketArticle = [];
    this.adminka = false;
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
    if (item.counter > 1) {
      item.counter--;
      this.count -= item.price;
      const toJson = JSON.stringify(this.basketArticle);
      localStorage.setItem('article', toJson);
    }
  }
  public plusCl(item: IProducts, index: number): void {
    item.counter++;
    // tslint:disable-next-line: no-shadowed-variable
    this.count = this.basketArticle.reduce((sum, item) => sum + item.counter * item.price, 0);
    const toJson = JSON.stringify(this.basketArticle);
    localStorage.setItem('article', toJson);
  }

  public deleteArticle(i: number): void {
    this.basketArticle = JSON.parse(localStorage.getItem('article'));
    this.basketArticle.splice(i, 1);
    localStorage.setItem('article', JSON.stringify(this.basketArticle));
    this.getSum();
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
        return product.categoryName === this.categoryName;
      });
    }
    );
  }













}
