import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { UserComponent } from './pages/user/user.component';
import { KatalogComponent } from './pages/katalog/katalog.component';
import { ProNasComponent } from './pages/pro-nas/pro-nas.component';
import { PaymentAndDeliveryComponent } from './pages/payment-and-delivery/payment-and-delivery.component';
import { ContactInformationComponent } from './pages/contact-information/contact-information.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { BuyNowComponent } from './pages/buy-now/buy-now.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';




const routes: Routes = [
  {path: 'user', component: UserComponent, children: [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'katalog/:category', component: KatalogComponent},
    {path: 'katalog/:category/:id', component: ProductDetailsComponent},
    {path: 'pro-nas', component: ProNasComponent},
    {path: 'payment-and-delivery', component: PaymentAndDeliveryComponent},
    {path: 'contact-information', component: ContactInformationComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog/:id', component: BlogDetailsComponent},
    {path: 'buy-now', component: BuyNowComponent},
  ]},
  { path: 'admin', component: AdminComponent, children: [
    {path: '', redirectTo: 'admin-category', pathMatch: 'full'},
    {path: 'admin-category', component: AdminCategoryComponent},
    {path: 'admin-product', component: AdminProductComponent},
    {path: 'admin-blog', component: AdminBlogComponent},
    {path: 'admin-order', component: AdminOrdersComponent},
  ]},
  {path: '**', redirectTo: 'user/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
