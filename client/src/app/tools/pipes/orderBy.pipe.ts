import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {
        return records.sort(function(a, b){
            if(a[args.property] === null) a[args.property] = '';
            if(b[args.property] === null) b[args.property] = '';
            
            if(a[args.property] < b[args.property]){
                return -1 * args.direction;
            }
            else if( a[args.property] > b[args.property]){
                return 1 * args.direction;
            }
            else{
                return 0;
            }
        });
    };
}