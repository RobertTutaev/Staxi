export class Report {
    constructor(
            public firmId: number = 0,
            public aDt: number = Date.parse('01.01.2000'),
            public bDt: number = Date.parse('01.01.2100'),
            public status: number = 0,
            public withChilds: boolean = false) { }

    getUrl(routerLinkArray: Array<string> = []): Array<string> {
        return routerLinkArray.concat(Object.keys(this).map((prop: string) => this[prop]));
    }
    
    getUrlMask(routerLink: string = ''): string {
        let url: string = routerLink;
        
        Object.keys(this).forEach((prop: string) => url+=`/:${prop}`);
        
        return url;
    }
}