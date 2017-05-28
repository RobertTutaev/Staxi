export class Contact { 
    constructor(
            public id: number = null,
            public client_id: number = null,    
            public type_id: number = null, 
            public name: string = null,
            public comment: string = null,
            public dt: string = null) { }
}