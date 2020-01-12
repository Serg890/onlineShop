import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { KatalogComponent } from './pages/katalog/katalog.component';
import { ProNasComponent } from './pages/pro-nas/pro-nas.component';
import { PaymentAndDeliveryComponent } from './pages/payment-and-delivery/payment-and-delivery.component';
import { ContactInformationComponent } from './pages/contact-information/contact-information.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { BuyNowComponent } from './pages/buy-now/buy-now.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { UserComponent } from './pages/user/user.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SearchPipe } from './shared/pipes/search.pipe';
import { TextMaskModule } from 'angular2-text-mask';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { Ng5SliderModule } from 'ng5-slider';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminBlogComponent,
    UserComponent,
    SearchPipe,
    KatalogComponent,
    ProNasComponent,
    PaymentAndDeliveryComponent,
    ContactInformationComponent,
    BlogComponent,
    ProductDetailsComponent,
    BuyNowComponent,
    AdminOrdersComponent,
    BlogDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'final-project'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    TextMaskModule,
    GooglePlaceModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
