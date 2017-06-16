export class Transportation { 
    constructor(
            public id: number = null,
            public client_id: number = null,
            public car_id: number = null,
            public punkt_id: number = null,
            public a_street_id: number = null,
            public a_dom: number = null,
            public a_korp: string = null,
            public a_dt: number = null,
            public b_street_id: number = null,
            public b_dom: number = null,
            public b_korp: string = null,
            public b_dt: number = null,
            public checked: boolean = false,
            public comments: string = null,
            public status: boolean = false,
            public user_id: number = null,
            public dt: number = null) { }
}