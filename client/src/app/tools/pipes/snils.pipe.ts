import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'snils', pure: false })
export class SnilsPipe implements PipeTransform {
  
  transform(value: string): string {
    if (!value) return value;

    value = value.replace(/\D+/ig, '');
    
    let str = '';
    for (let i = 0; i < value.length; i++) {
      str += value[i];
      if (i===2 || i===5 || i==8 && value[i]!=='-') str += '-';
    }
    
    return str;          
  }
}