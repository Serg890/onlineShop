import { ProductService } from 'src/app/shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from 'src/app/shared/services/product-details.service';
import { ActivatedRoute } from '@angular/router';
import { Coment } from 'src/app/shared/classes/coment.model';
import { IComent } from 'src/app/shared/interfaces/coment.interface';
import { IProducts } from 'src/app/shared/interfaces/admin-product.interface';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  arrComent: IComent[] = [];
  product: IProducts;
  productID: string;
  count: number;
  dateCom: number;
  // nameCom: string;
  // emailCom: string;
  // textCom: string;
  prod: IProducts[] = [];
  formData: { id: any; categoryName: string; name: string; description: string; price: any; };
  basketArticle: any;

  constructor(
    private productDetService: ProductDetailsService,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
  ) {
    this.getDetProduct();
    this.getComent();
  }

  ngOnInit() {
    if (localStorage.getItem('article')) {
      const basket = JSON.parse(localStorage.getItem('article'));
      this.prod.push(...basket);
    }
  }

  private getDetProduct(): any {
    this.productID = this.route.snapshot.paramMap.get('id');
    this.productDetService.getDetailsProduct(this.productID).subscribe(
      doc => {
        this.product = doc.data();
        console.log(this.product);
      }
    );
  }

  private getComent(): void {
    this.productDetService.getComentar().subscribe(
      arrayCat => {
        this.arrComent = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as IComent;
        });
        console.log(this.arrComent);
      }
    );
  }

  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('comentar').add(data);
    } else {
      this.firestore.doc('comentar/' + form.value.id).update(data);
    }
    // this.resetForm();

  }

  // public resetForm(form?: NgForm) {
  //   if (form != null) {
  //     form.resetForm();
  //   }
  //   this.formData = {
  //     id: null,
  //     name: '',
  //     email: '',
  //     text: ''

  //   };
  // }

  public minusCl(item: IProducts, index: number): void {
    if (item.counter > 1) {
      item.counter--;
      this.count -= item.price;
    }
  }
  public plusCl(item: IProducts, index: number): void {
    item.counter++;
    debugger
  }

  // public minusCl(product: IProducts): void {
  //   product.counter = 1;
  //   if (product.counter > 1) {
  //     product.counter--;
  //     console.log(product.counter);

  //     // this.count -= item.price;
  //   }
  // }
  // public plusCl(product: IProducts): void {
  //   if (product.counter >= 1) {
  //     product.counter++;
  //   }
  //   // tslint:disable-next-line: no-shadowed-variable
  //   // this.count = this.basketArticle.reduce((sum, item) => sum + item.counter * item.price, 0);
  // }

  public addBusket(product: IProducts): void {

    if(JSON.parse(localStorage.getItem('article')).length){
      const findIndex = this.prod.findIndex(item => item.id === product.id);
      this.prod.splice(findIndex, 1, product);
    }
    else{
this.prod.push(product)
    }

    const toJson = JSON.stringify(this.prod);
    localStorage.setItem('article', toJson);
  }

}
