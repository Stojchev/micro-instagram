import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './product/products-all/all-products.component';
import { AddNewProductComponent } from './product/products-add-new/add-new-product.component';
import { EditProductComponent } from './product/products-edit/edit-product.component';
import { ProductsViewComponent } from './product/products-view/products-view.component';

const routes: Routes = [
  // { path: 'products/add-new', component:AddNewProductComponent },
  { path: 'products/:id', component: ProductsViewComponent },
  { path: 'products/edit/:id', component: EditProductComponent },
  { path: '', component:AllProductsComponent },
  { path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
