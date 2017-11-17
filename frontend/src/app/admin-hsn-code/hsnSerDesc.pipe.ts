import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'hsnSerDescFilter', pure: false })
export class hsnSerDescPipe implements PipeTransform {
    transform(servicesData: any, codeSerValue: any): any {
        if (codeSerValue == null ) return servicesData;
        // if (codeValue == null) return servicesData;
        
        return servicesData.filter(function (item) {
            return item.description.toLowerCase().indexOf(codeSerValue.toLowerCase()) > -1 
            // item.description.toLowerCase().indexOf(codeValue.toLowerCase()) > -1
            ;
        })
    }
}
