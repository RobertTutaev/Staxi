import { Report } from './report';

export class CReport extends Report {
    constructor(
            public carId: number = null,
            public aDt: Date = new Date(),
            public getFile: number = 0) { super(); }
}
