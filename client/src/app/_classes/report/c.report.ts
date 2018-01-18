import { Report } from './report';

export class CReport extends Report {
    constructor(
            public carId: number = null,
            public aDt: number = Date.now(),
            public getFile: number = 0) { super(); }
}
