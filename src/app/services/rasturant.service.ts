import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RasturantService {

  api = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<any> {
    return this.httpClient.get(this.api+"/categories");
  }
  getMeals(id): Observable<any>{
    return this.httpClient.get(this.api+"/meals/"+id);
  }
}
