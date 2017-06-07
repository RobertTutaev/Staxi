export class Contact { 
    constructor(
            public id: number = null,
            public client_id: number = null,
            public kateg_id: number = null,
            public doc_id: number = null,
            public doc_ser: string = null,
            public doc_number: string = null,
            public doc_dt: string = null,
            public dt_begin: string = null,
            public dt_end: string = null,            
            public dt: string = null) { }
}