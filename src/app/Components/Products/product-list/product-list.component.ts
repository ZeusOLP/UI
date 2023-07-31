import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Product } from 'src/app/Modules/product.module';
import {MatTableDataSource} from "@angular/material/table";
import { ApiService } from 'src/app/api/api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit  {
  public dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['name', 'description', 'price', 'image', 'actions'];
  product: Product[] = [];
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('slider') slider: any;

  constructor(private httpClient: HttpClient) { }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getAllProducts()
    .subscribe((res)=>{
      this.product = res;
      this.dataSource.data = res;
    })
  }

  addToCart(id: string){
    const amount = +(<HTMLInputElement>document.getElementById(id)).value;
    const exists = this.getCookie(id);

    if(exists != 0){
      this.setCookie(id, amount + 1);
    } else {
      this.setCookie(id, amount);
    }
  }

  private setCookie(name: string, value: number) {
    let d:Date = new Date();
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  private getCookie(name: string): number {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;

    for (let i: number = 0; i < caLen; i += 1) {
      if(ca[i].split("=")[0] == name)
        return +ca[i].split("=")[1];
    }
    return 0;
  }

  sliderFilter(){
    const filter = (this.slider as any).nativeElement.value;
    this.dataSource.data = this.product.filter((res) => { return res.price <= filter });
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'price':
          return this.compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  //Supposed to go in ApiService
  baseUrl: string = environment.baseUrl;
  getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.baseUrl + "api/GetAllProducts");
  }
}
