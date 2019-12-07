import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/IProduct';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(items: Product[], filter: string): any {
    if (!items || !filter) {
        return items;
    }
    return items.filter(item => item.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1);
}

}
