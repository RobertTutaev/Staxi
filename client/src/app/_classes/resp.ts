export class Resp {
    constructor(
            public status: number = 200,
            public rslt: number = 1,
            public msg: string = '',
            public data: any = null) { }
}
