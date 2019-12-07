import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/IProduct';

@Pipe({
  name: 'productCategoryFilter'
})
export class ProductCategoryFilterPipe implements PipeTransform {

  transform(products: Product[], id: number): any {
    if (id === 0) {
      return products;
    }
    let result = [];
    products.forEach(element => {
      if (element.categoryId === id) {
        result.push(element);
      }
    });
    return result;
  }

}
