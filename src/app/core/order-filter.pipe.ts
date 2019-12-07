import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../interfaces/IOrder';
import { element } from 'protractor';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(items: Order[], ...filter: any[]): any {
    if (!items || !filter) {
      return items;
    }

    if (filter[0] === 'All' && filter[1] === 'All') {
      return items;
    }

    if (filter[0] !== 'All' && filter[1] !== 'All') {
      let result = [];
      items.forEach(element=>{
        if(element.status === filter[0]) {
          result.push(element);
        }
      });
      let finalResult = [];
      result.forEach(element=>{
        if(element.deliveryType === filter[1]) {
          finalResult.push(element);
        }
      });
      return finalResult;
    }

    if (filter[0] !== 'All' && filter[1] === 'All') {
      let result = [];
      items.forEach(element=>{
        if(element.status === filter[0]) {
          result.push(element);
        }
      });
      return result;
    }
    if (filter[0] === 'All' && filter[1] !== 'All') {
      let result = [];
      items.forEach(element=>{
        if(element.deliveryType === filter[1]) {
          result.push(element);
        }
      });
      return result;
    }
  }

}
