import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IOrder } from 'src/app/shared/interfaces/info-order.interface';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  arrInfoPerson: IOrder[] = [];

  constructor(private productService: ProductService,
              private firestore: AngularFirestore) {
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
      }
    );

  }

  public deleteSearchCategory(id: string): void {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('orders/' + id).delete();
    }
  }






}
