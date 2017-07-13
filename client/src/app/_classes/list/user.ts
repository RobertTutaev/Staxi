export class User { 
    constructor(
            public id: number = null,
            public username: string = null,
            public password: string = null,
            public confirmPassword: string = null,
            public first_name: string = null,
            public last_name: string = null,
            public firm_id: number = null,
            public firm: string = null,
            public role0: boolean = true,
            public role1: boolean = false,
            public role2: boolean = false,
            public role3: boolean = false,
            public role4: boolean = false,
            public checked: boolean = false,
            public dt: number = null,
            public dtm: number = null) { }
}