export class Category { 
    constructor(
            public id: number = null,
            public client_id: number = null,
            public kateg_id: number = null,
            public kateg: string = null,
            public doc_id: number = null,
            public doc: string = null,
            public doc_ser: string = null,
            public doc_number: string = null,
            public doc_dt: number = null,
            public dt_begin: number = null,
            public dt_end: number = null,
            public user_id: number = null,
            public user: string = null,
            public dt: number = null,
            public userm_id: number = null,
            public userm: string = null,
            public dtm: number = null) { }
}