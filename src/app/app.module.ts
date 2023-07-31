import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './Components/Products/product-list/product-list.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HttpClientModule} from "@angular/common/http";
import { AppMaterialModule } from './app.material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartListComponent } from './Components/Products/cart-list/cart-list.component';
import { OrderHistoryComponent } from './Components/Products/order-history/order-history.component';
import { ApiService } from './api/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartListComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavBarComponent,
    HttpClientModule,
    AppMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
