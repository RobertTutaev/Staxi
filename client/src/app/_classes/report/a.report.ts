import { Report } from './report';

export class AReport extends Report {
    constructor(
            public firmId: number = null,
            public aDt: number = Date.now(),
            public bDt: number = Date.now(),
            public statusId: number = 1,
            public withChilds: number = 0,
            public getFile: number = 0) { super(); }
}
