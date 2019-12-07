import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bigAmountConvertor'
})
export class BigAmountConvertorPipe implements PipeTransform {

  transform(value: any): any {
    value = Math.round(value);
    const suffixes = ["", "k", "m", "b","t"];
    let suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        var shortNum = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
  }

}
