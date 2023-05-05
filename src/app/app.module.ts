import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllProductsComponent } from './product/products-all/all-products.component';
import { EditProductComponent } from './product/products-edit/edit-product.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { AddNewProductComponent } from './product/products-add-new/add-new-product.component';
import { ProductsViewComponent } from './product/products-view/products-view.component';
import { DialogsComponent } from './product/dialogs/dialogs.component';

@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    EditProductComponent,
    NavigationComponent,
    AddNewProductComponent,
    ProductsViewComponent,
    DialogsComponent
  ],
  imports: [ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      {
        path:'products/:id' ,
        component: EditProductComponent,
      },
      {
        path: 'all-products',
        component: AllProductsComponent
      },
      {path: '', redirectTo: 'all-products', pathMatch: 'full'},
      {path:'**' , redirectTo:'welcome',pathMatch:'full'},
    ]),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
