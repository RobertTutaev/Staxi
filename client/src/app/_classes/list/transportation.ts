export class Transportation { 
    constructor(
            public id: number = null,
            public client_id: number = null,
            public client: string = '',
            public car_id: number = null,
            public car: string = null,
            public punkt_id: number = null,
            public punkt: string = null,
            public category_id: number = null,
            public a_street_id: number = null,
            public a_street: string = null,
            public a_dom: number = null,
            public a_korp: string = '',
            public a_adr: string = null,
            public a_dt: any = null,
            public b_street_id: number = null,
            public b_street: string = null,
            public b_dom: number = null,
            public b_korp: string = '',
            public b_adr: string = null,
            public b_dt: number = null,
            public comment: string = null,
            public status: number = 0,
            public user_id: number = null,
            public user: string = null,
            public dt: number = null,
            public userm_id: number = null,
            public userm: string = null,
            public dtm: number = null,
            public firm: string = '') { }
}