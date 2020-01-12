import { IProducts } from './../../shared/interfaces/admin-product.interface';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ICategory } from 'src/app/shared/interfaces/admin-category.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  @ViewChild('closeModal1', { static: false }) closeModal1: ElementRef;
  @ViewChild('closeModal2', { static: false }) closeModal2: ElementRef;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;
  productImage: string;
  imgID: string;
  getCatelogies: ICategory[];
  adminProducts: IProducts[];
  search: string;

  productsID: string;

  editNameProd: string;
  editDescProd: string;
  editPriceProd: number;
  editNameCatProd: string;
  editImgProd: string;
  formData: { id: any; name: string; };

  constructor(private prStorage: AngularFireStorage,
              private productService: ProductService,
              private categoryService: CategoryService,
              private firestore: AngularFirestore) {
    this.getCate();
    this.getAdminProd();
  }

  ngOnInit() {
  }

  private getCate(): void {
    this.categoryService.getCategory().subscribe(
      arrayCat => {
        this.getCatelogies = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as ICategory;
        });
        console.log(this.getCatelogies);
      }
    );
  }


  private getAdminProd(): void {
    this.productService.getProducts().subscribe(
      arrayCat => {
        this.adminProducts = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as IProducts;
        });
        console.log(this.adminProducts);
      }
    );
  }


  public onSubmit(form: NgForm) {
    const data = Object.assign({counter: 1 }, form.value);
    data.img = this.productImage;
    data.imgID = this.imgID;
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('products').add(data);
    } else {
      this.firestore.doc('products/' + form.value.id).update(data);
    }
    // this.resetForm();
    this.closeModal1.nativeElement.click();
  }




  // public resetForm(form?: NgForm) {
  //   if (form != null) {
  //     form.resetForm();
  //   }
  //   this.formData = {
  //     id: null,
  //     categoryName: '',
  //     name: '',
  //     description: '',
  //     price: null

  //   };
  // }

  public deleteSearchCategory(prod: IProducts, id: string): void {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('products/' + id).delete();
      const filePath = `/${prod.imgID}`;
      const storageRef = this.prStorage.ref('images/');
      storageRef.child(filePath).delete();
    }
  }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.prStorage.ref(`images/${id}`);
    this.imgID = id;
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => this.productImage = url);
      })
    ).subscribe();
  }

  public editProducts(products): void {
    this.productsID = products.id;
    this.editNameProd = products.name;
    this.editDescProd = products.description;
    this.editPriceProd = products.price;
    this.editNameCatProd = products.categoryid;
    this.editImgProd = products.img;
  }
  editSave(): void {
    this.firestore.collection('products').doc(this.productsID).update({
      id: this.productsID,
      name: this.editNameProd,
      description: this.editDescProd,
      price: this.editPriceProd
    });
    this.closeModal2.nativeElement.click();
    this.editNameProd = '';
    this.editDescProd = '';
    this.editPriceProd = null;

  }



}
