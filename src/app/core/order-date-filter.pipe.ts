import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../interfaces/IOrder';


@Pipe({
  name: 'orderDateFilter'
})
export class OrderDateFilterPipe implements PipeTransform {

  transform(orders: Order[], fromDate: Date, toDate: Date): any {
    if (!orders || !fromDate || !toDate) {
      return orders;
    }
    return orders.filter(order => 
      (new Date (order.orderDate).toLocaleDateString()) >= fromDate.toLocaleDateString() && (new Date (order.orderDate).toLocaleDateString()) <= toDate.toLocaleDateString()  
    );
  }

}
