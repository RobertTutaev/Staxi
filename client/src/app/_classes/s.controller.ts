export class SController {

  records: Array<any>;
  isDesc: boolean = false;
  column: string = 'id';
  direction: number = -1;

  onSort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };
}
