import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  api = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }
  getAddresses(): Observable<any>{
   return this.httpClient.get(this.api+"/addresses");
  }
}
