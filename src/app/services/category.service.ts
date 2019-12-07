import { Injectable } from '@angular/core';
import { Category } from '../interfaces/ICategory';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  api = "http://localhost:3000/categories";
  constructor(private httpClient: HttpClient) { }

  getCategoryByParentId(id: number): Observable<any> {
    return this.httpClient.get(this.api + "?parentCategoryId=" + id);
  }
  addCategory(category: Category): Observable<any> {
    return this.httpClient.post(this.api, category);

  }
  removeCategory(categoryId: number): Observable<any> {
    return this.httpClient.delete(this.api + "/" + categoryId);
  }
  getCategories(): Observable<any> {
    return this.httpClient.get(this.api);
  }
}
