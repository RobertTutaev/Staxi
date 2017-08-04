export class Client { 
    constructor(
            public id: number = null,
            public snils: string = null,
            public fam: string = null,
            public im: string = null,
            public ot: string = null,
            public birthday: Date = null,
            public street_id: number = null,
            public street: string = null,
            public dom: number = null,
            public korp: string = null,
            public kv: string = null,
            public reason_id: number = 1,
            public user_id: number = null,
            public user: string = null,            
            public dt: number = null,
            public userm_id: number = null,
            public userm: string = null,
            public dtm: number = null) { }
}