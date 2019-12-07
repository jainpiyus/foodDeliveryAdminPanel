import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/IProduct';

@Pipe({
  name: 'productAttributeFilter'
})
export class ProductAttributeFilterPipe implements PipeTransform {

  transform(items: Product[], ...filter: any[]): any {

    if (!items || !filter) {
      return items;
    }

    if (filter[0] === 'All' && filter[1] === 'All') {
      return items;
    }

    if (filter[0] !== 'All' && filter[1] !== 'All') {
      let result = [];
      items.forEach(element => {
        if (element.active === filter[0]) {
          result.push(element);
        }
      });
      let finalResult = [];
      result.forEach(element => {
        if (element.type === filter[1]) {
          finalResult.push(element);
        }
      });
      return finalResult;
    }

    if (filter[0] !== 'All' && filter[1] === 'All') {
      let result = [];
      items.forEach(element => {
        if (element.active === filter[0]) {
          result.push(element);
        }
      });
      return result;
    }
    if (filter[0] === 'All' && filter[1] !== 'All') {
      let result = [];
      items.forEach(element => {
        if (element.type === filter[1]) {
          result.push(element);
        }
      });
      return result;
    }
  }
}
