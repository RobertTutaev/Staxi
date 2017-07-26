import * as moment from 'moment';
import * as FileSaver from 'file-saver';

export class RService {  
  
  protected saveAsBlob(data: any, type: string) {
      const dt = new Date();      
      const blob = new Blob([data._body],
          { type: 'application/vnd.ms-excel' });
      const file = new File([blob], `report_${type}_${moment(dt).format('YYYY.MM.DD.hh.mm.ss')}.xlsx`,
          { type: 'application/vnd.ms-excel' });
  
      FileSaver.saveAs(file);
  }
  
  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}