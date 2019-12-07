import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/Ilogin';
import { Customer } from '../interfaces/ICustomer';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(items: Customer[], ...filter: any[]): any {
    if (!items || !filter) {
      return items;
    }

    if (filter[0] === 'All') {
      return items;
    }

    if (filter[0] !== 'All') {
      let result = [];
      items.forEach(element => {
        if (element.active === filter[0]) {
          result.push(element);
        }
      });
      return result;
    }

  }


}
