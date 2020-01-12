import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Category } from 'src/app/shared/classes/admin-category.model';
import { ICategory } from 'src/app/shared/interfaces/admin-category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  @ViewChild('closeModal1', { static: false }) closeModal1: ElementRef;
  @ViewChild('closeModal2', { static: false }) closeModal2: ElementRef;
  @ViewChild('closeModal3', { static: false }) closeModal3: ElementRef;
  adminCategories: Array<ICategory>;
  categoryId: string;
  categoryName: string;
  editStatus: boolean;
  search: string;
  deleteId: number;
  formData: ICategory;
  name: string;
  constructor(private categoryService: CategoryService,
              private firestore: AngularFirestore,
    ) {
    // this.getAdminCat();
    this.getCategorisss();

  }

  ngOnInit() {
    this.resetForm();

  }

  public getCategorisss(): void {
    this.categoryService.getCategory().subscribe(
      arrayCat => {
        this.adminCategories = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as ICategory;
        });
        console.log(this.adminCategories);
      }
    );

  }


  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (data.name) {
      if (form.value.id == null) {
        this.firestore.collection('category').add(data);
      } else {
        this.firestore.doc('category/' + this.categoryId).update(data);
      }

    }
    this.closeModal1.nativeElement.click();

  }

  public resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.formData = {
      id: null,
      name: ''
    };
  }

  public deleteSearchCategory(id: string): void {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('category/' + id).delete();
    }
  }
  public editCategory(category): void {
    this.categoryId = category.id;
    this.categoryName = category.name;
  }

  public saveEditCategory(): void {
    this.firestore.collection('category').doc(this.categoryId).update({
      id: this.categoryId,
      name: this.categoryName,
    });
    this.clearForm();
    this.closeModal2.nativeElement.click();
  }


  public clearForm(): void {
    this.categoryId = '';
    this.categoryName = '';
    this.editStatus = false;
  }


}
