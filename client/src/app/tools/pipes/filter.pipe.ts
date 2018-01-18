import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {

  transform(records: Array<any>, args?: any ): any {
    if (args.property == null || args.value == null || !records) { return records; }

    return records.filter(function(record) {
      return record[args.property].toLowerCase().indexOf(args.value.toLowerCase()) > -1;
    })
  }
}
