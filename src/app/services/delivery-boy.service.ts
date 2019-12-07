import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliveryBoy } from '../interfaces/IDeliveryBoy';

@Injectable({
  providedIn: 'root'
})
export class DeliveryBoyService {

  api = "http://localhost:3000/delivery-boy";

  constructor(private httpClient: HttpClient) { }

  updateDeliveryBoy(deliveryBoy: DeliveryBoy):Observable<any>{
    return this.httpClient.put(this.api+"/" +deliveryBoy.id,  deliveryBoy);
  }
  getAllDeliveryBoys(): Observable<any>{
   return this.httpClient.get(this.api);
  }
  getDeliveryBoyById(id: number): Observable<any>{
    return this.httpClient.get(this.api+"/"+id);
  }

  addDeliveryBoy(deliveryBoy: DeliveryBoy):  Observable<any>{
    return this.httpClient.post(this.api, deliveryBoy);
  }
  deleteDeliveryBoy(id: number): Observable<any> {
    return this.httpClient.delete(this.api+"/"+id);
  }
}
