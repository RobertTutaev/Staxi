import { Report } from './report';

export class BReport extends Report {
    constructor(
            public firmId: number = null,
            public aYear: number = (new Date()).getFullYear(),
            public aMonth: number = (new Date()).getMonth() + 1,
            public withChilds: number = 0,
            public getFile: number = 0) { super(); }
}
