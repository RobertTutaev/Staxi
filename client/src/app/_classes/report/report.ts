export class Report {

    getUrl(routerLinkArray: Array<any> = []): Array<any> {
        return routerLinkArray.concat(Object.keys(this).map((prop: string) => +this[prop]));
    }

    getUrlValue(routerLink: string = ''): string {
        let url: string = routerLink;

        Object.keys(this).forEach((prop: string) => url += `/${+this[prop]}`);

        return url;
    }

    clone(report: Object): this {
        Object.keys(report).forEach((prop: string) =>
            this.hasOwnProperty(prop) ? 
                ( 
                    this[prop] instanceof Date ? 
                        this[prop] = new Date(+report[prop]) : 
                        this[prop] = +report[prop] 
                ) :
                null);

        return this;
    }
}
