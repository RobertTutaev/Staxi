import { Report } from './report';

export class AReport extends Report {
    constructor(
            public firmId: number = null,
            public aDt: Date = new Date(),
            public bDt: Date = new Date(),
            public statusId: number = 1,
            public withChilds: number = 0,
            public getFile: number = 0) { super(); }
}
