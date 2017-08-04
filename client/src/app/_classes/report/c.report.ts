import { Report } from './report';

export class CReport extends Report {
    constructor(
            public carId: number = null,
            public aDt: number = Date.now(),
            public statusId: number = 1,
            public getFile: number = 0) { super(); }
}