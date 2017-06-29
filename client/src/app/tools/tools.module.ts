import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';

import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/orderby.pipe';
import { EqualValidatorDirective } from './directives/equal-validator.directive';

NguiDatetime.daysOfWeek = [
    { fullName: 'Воскресенье', shortName: 'Вс' },
    { fullName: 'Понедельник', shortName: 'Пн' },
    { fullName: 'Вторник', shortName: 'Вт' },
    { fullName: 'Среда', shortName: 'Ср' },
    { fullName: 'Четверг', shortName: 'Чт' },
    { fullName: 'Пятница', shortName: 'Пт' }, 
    { fullName: 'Суббота', shortName: 'Сб' }
  ];

NguiDatetime.months = [
    { fullName: 'Январь', shortName: 'Янв' },
    { fullName: 'Февраль', shortName: 'Фев' },
    { fullName: 'Март', shortName: 'Мар' },
    { fullName: 'Апрель', shortName: 'Апр' },
    { fullName: 'Май', shortName: 'Май' },
    { fullName: 'Июнь', shortName: 'Июн' }, 
    { fullName: 'Июль', shortName: 'Июл' },
    { fullName: 'Август', shortName: 'Авг'},
    { fullName: 'Сентябрь', shortName: 'Сен' },
    { fullName: 'Октябрь', shortName: 'Окт' },
    { fullName: 'Ноябрь', shortName: 'Ноя' }, 
    { fullName: 'Декабрь', shortName: 'Дек'}
  ];

NguiDatetime.locale = {
    currentTime: "сейчас",
    date: "дата",
    day: "день",
    hour: "часы",
    minute: "минуты",
    month: "месяц",
    time: "время",
    year: "год"
  };


@NgModule({
  imports: [
    NguiDatetimePickerModule,
    CommonModule
  ],
  declarations: [    
    FilterPipe,
    OrderByPipe,
    EqualValidatorDirective
  ],
  exports: [
    NguiDatetimePickerModule,
    FilterPipe,
    OrderByPipe
  ]
})
export class ToolsModule { } 