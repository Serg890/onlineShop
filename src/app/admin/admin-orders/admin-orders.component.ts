import { IProducts } from './../../shared/interfaces/admin-product.interface';
import { IOrder } from './../../shared/interfaces/info-order.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  arrInfoPerson: IOrder[] = [];
  count: number;
  obj: any;
  constructor(private productService: ProductService,
              private firestore: AngularFirestore,
              private prStorage: AngularFireStorage) {
    this.getOrders();

  }

  ngOnInit() {
  }

  public getOrders(): void {
    this.productService.getOrder().subscribe(
      arrayCat => {
        this.arrInfoPerson = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as IOrder;

        });
        console.log(this.arrInfoPerson);
        // this.count = this.arrInfoPerson.reduce((sum, item) => sum + item.order.counter * item.order.price, 0);
      }
    );

  }

  public deleteSearchCategory( order: IProducts , id: string): void {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('orders/' + id).delete();
    }
  }






}
