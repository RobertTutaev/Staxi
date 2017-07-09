import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'snils' })
export class SnilsPipe implements PipeTransform {
  
  transform(value: string, args: string[]): any {
    if (!value) return value;

    let rec = value.replace(/-/g,'');
        rec = value.replace(/ /g,'');
    let str = '';
    for (let i = 0; i < rec.length; i++) {
      str += value[i];
      if (i === 2)  str += '-';
    }

    return str;          
  }
}