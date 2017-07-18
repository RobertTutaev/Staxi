export class Report { 
    constructor(
            public firmId: number = 0,
            public aDt: number = Date.parse('01.01.2000'),
            public bDt: number = Date.parse('01.01.2100'),
            public status: number = 0,
            public withChilds: boolean = false) { }
}