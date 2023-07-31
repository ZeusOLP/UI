import { Component} from '@angular/core';
import { Cart } from 'src/app/Modules/cart.module';
import {MatTableDataSource} from "@angular/material/table";
import { ApiService } from 'src/app/api/api.service';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from 'src/app/Modules/product.module';
import { Order } from 'src/app/Modules/order.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent {
  public dataSource = new MatTableDataSource<Cart>();
  displayedColumns: string[] = ['name', 'price', 'amount'];
  cart: Cart[] = [];
  cost: number = 0;
  productIds: string[] = [];
  cookies: {id: string, count: number}[] = []

  constructor(private httpClient: HttpClient) { }
  ngOnInit(): void {
    const rawCookies = this.getCookies();
    let caLen: number = rawCookies.length;

    for(let i: number = 0; i < caLen; i += 1){
      const c = rawCookies[i].split("=");
      this.cookies.push({id: c[0], count: +c[1]});
      this.productIds.push(c[0]);
    }

    this.cookies = this.cookies.sort((a, b) => { 
      return a.id.localeCompare(b.id);
    });

    this.getProductsByIds(this.productIds)
      .subscribe((res)=>{
      this.cart = res;
      this.cart.forEach((e, i) => {
        this.cost += e.price * +this.cookies[i].count;
        e.amount = +this.cookies[i].count;
      });
      this.dataSource.data = this.cart;
    })
  }

  updateCart(id: string){
    const amount = +(<HTMLInputElement>document.getElementById(id)).value;
    this.cost = 0;
    this.dataSource.data.forEach(x => {
      if(x.productId == id)
        {x.amount = amount}
      this.cost += x.price * x.amount
    });

    this.setCookie(id, amount);
  }

  removeCart(id: string){
    this.deleteCookie(id);
    this.dataSource.data = this.dataSource.data.filter(e => { return e.productId != id});
  }

  order(){
    const order: Order = {
      price: this.cost,
      products: this.productIds.toString()
    }
    this.postOrder(order).subscribe({next: (res) => {console.log(res)}})
  }

  private setCookie(name: string, value: number) {
    let d:Date = new Date();
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  private deleteCookie(name: string) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  private getCookies(): Array<string> {
    return document.cookie.split(';');
  }

  //Supposed to go in ApiService
  baseUrl: string = environment.baseUrl;
  getProductsByIds(productIds: string[]): Observable<Cart[]>{
    return this.httpClient.get<Cart[]>(this.baseUrl + "api/GetProductsByIds", {params: {productIds: productIds}});
  }

  postOrder(order: Order): Observable<Order>{
    order.orderId = "00000000-0000-0000-0000-000000000000";
    return this.httpClient.post<Order>(this.baseUrl + "api/PostOrder", order);
  }
}
