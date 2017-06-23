export class Transportation { 
    constructor(
            public id: number = null,
            public client_id: number = null,
            public car_id: number = null,
            public car: string = null,
            public punkt_id: number = null,
            public punkt: string = null,
            public a_street_id: number = null,
            public a_street: string = null,
            public a_dom: number = null,
            public a_korp: string = '',
            public a_adr: string = null,
            public a_dt: number = null,
            public b_street_id: number = null,
            public b_street: string = null,
            public b_dom: number = null,
            public b_korp: string = '',
            public b_adr: string = null,
            public b_dt: number = null,
            public checked: boolean = false,
            public comments: string = null,
            public status: boolean = false,
            public user_id: number = null,
            public user: string = null,
            public dt: number = null) { }
}