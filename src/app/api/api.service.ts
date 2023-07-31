import { Product } from "../Modules/product.module";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({ providedIn:'root'})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>("https://localhost:7130/api/GetAllProducts");
  }
}