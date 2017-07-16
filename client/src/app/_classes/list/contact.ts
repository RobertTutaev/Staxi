export class Contact { 
    constructor(
            public id: number = null,
            public client_id: number = null,    
            public type_id: number = null,
            public type: string = null,
            public name: string = null,
            public comment: string = null,
            public user_id: number = null,
            public user: string = null,
            public dt: number = null,
            public userm_id: number = null,
            public userm: string = null,
            public dtm: number = null) { }
}