import { Injectable } from '@angular/core';
import { Product } from '../interfaces/IProduct';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  api = "http://localhost:3000/products";

  constructor(private httpClient: HttpClient) { }

  addProduct(product: Product): Observable<any> {
    return this.httpClient.post(this.api, product);
  }
  getAllProducts(): Observable<any> {
    return this.httpClient.get(this.api);
  }
  getProductsByCategoryId(id: number): Observable<any>{
    return this.httpClient.get(this.api+"?categoryId="+id);
  }
  updateProduct(product: Product): Observable<any> {
    return this.httpClient.put(this.api+"/"+product.id, product);
  }
}
