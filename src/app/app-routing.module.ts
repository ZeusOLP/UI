import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './Components/Products/product-list/product-list.component';
import { CartListComponent } from './Components/Products/cart-list/cart-list.component';
import { OrderHistoryComponent } from './Components/Products/order-history/order-history.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'cart',
    component: CartListComponent
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
