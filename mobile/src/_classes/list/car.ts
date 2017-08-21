export class Car { 
    constructor(
            public id: number = null,
            public name: string = '',
            public color: string = null,    
            public gos_no: string = null,
            public firm_id: number = null,
            public firm: string = null,
            public user_id: number = null,
            public user: string = null,
            public driver_name: string = '',
            public driver_phone: string = '',
            public type: boolean = false,
            public status: boolean = true) { }
}