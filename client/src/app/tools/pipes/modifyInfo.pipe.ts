import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { IModifyInfo } from './modifyInfo.interface';

@Pipe({ name: 'modifyInfo', pure: false })
export class ModifyInfoPipe implements PipeTransform {

  datePipe: DatePipe = new DatePipe('ru-RU');
  datePipeFormat: string = 'dd.MM.yyyy HH:mm:ss';  

  transform(value: IModifyInfo): string {

    return  "Созд.: " +
            (value.dt     ? this.datePipe.transform(value.dt, this.datePipeFormat) + " " : "") + 
            (value.user   ? value.user : "-") + 
            "; изм.: " +
            (value.dtm    ? this.datePipe.transform(value.dtm, this.datePipeFormat) + " " : "") + 
            (value.userm  ? value.userm : "-");          
  }
}