export class Report {
    constructor(
            public firmId: number = null,
            public aDt: number = Date.parse('01.01.2000'),
            public bDt: number = Date.parse('01.01.2100'),
            public status: number = 0,
            public withChilds: number = 0) { }

    getUrl(routerLinkArray: Array<any> = []): Array<any> {
        return routerLinkArray.concat(Object.keys(this).map((prop: string) => +this[prop]));
    }
    
    getUrlMask(routerLink: string = ''): string {
        let url: string = routerLink;
        
        Object.keys(this).forEach((prop: string) => url+=`/:${prop}`);
        
        return url;
    }

    getUrlValue(routerLink: string = ''): string {
        let url: string = routerLink;
        
        Object.keys(this).forEach((prop: string) => url+=`/${+this[prop]}`);
        
        return url;
    }

    clone(report: Object): this {        
        Object.keys(report).forEach((prop: string) => 
            this.hasOwnProperty(prop) ? this[prop] = +report[prop] : null );

        return this;
    }
}