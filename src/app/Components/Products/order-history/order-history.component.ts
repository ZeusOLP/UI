import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { ApiService } from 'src/app/api/api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/Modules/order.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public dataSource = new MatTableDataSource<Order>();
  displayedColumns: string[] = ['orderId', 'price', 'date'];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getAllOrders()
    .subscribe((res)=>{
      this.dataSource.data = res;
    })
  }

  //Supposed to go in ApiService
  baseUrl: string = environment.baseUrl;
  getAllOrders(): Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.baseUrl + "api/GetAllOrderHistories");
  }
}
