import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'familia'})
export class FamiliaPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;
    
    return value = value.charAt(0) + '.';
  }
}