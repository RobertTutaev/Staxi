import { NativeDateAdapter } from '@angular/material';

export class ToolsDateAdapter extends NativeDateAdapter {
  
  parse(value: any): Date | null {
    // 1. String ("-")
    if (typeof value === 'string' && value.indexOf('-') > -1) {
      const timestamp = typeof value === 'number' ? value : Date.parse(value);      
      return isNaN(timestamp) ? null : new Date(timestamp);
    }
    
    // 2. String (".")
    if (typeof value === 'string' && value.indexOf('.') > -1) {
      const str = value.split('.');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const day = Number(str[0]);
      return new Date(year, month, day);
    }

    // 3. Number
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
};