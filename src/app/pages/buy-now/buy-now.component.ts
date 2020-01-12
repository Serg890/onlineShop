import { IOrder } from './../../shared/interfaces/info-order.interface';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {
  orderProduct: IOrder[] = [];
  check: boolean;
  order: IOrder[] = [];
  email: string;
  public mask = ['+', '3', '8', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor( private firestore: AngularFirestore) {
                 this.getBasketProduct();
               }

  ngOnInit() {
    this.order = this.orderProduct;

  }


  public getBasketProduct(): void {
    if (localStorage.length) {
      if (localStorage.getItem('article')) {
        this.orderProduct = JSON.parse(localStorage.getItem('article'));
      }
      console.log(this.orderProduct);

    }
  }


  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (data.email) {
      if (form.value.id == null) {
        this.firestore.collection('orders').add(data);
        this.orderProduct = [];
        localStorage.clear();
        this.check = true;
      } else {
        this.firestore.doc('orders/' + form.value.id).update(data);
      }
    }
    // const regEmail = /^[a-zA-Z\d\.]+@[a-z]{1,6}\.[a-z]{1,3}(\.[a-z]{1,3})?$/;
    // if (regEmail.test(this.email)) {
    //   this.check = false;
    // } else {
    //   this.check = true;

    // }
  }



}
