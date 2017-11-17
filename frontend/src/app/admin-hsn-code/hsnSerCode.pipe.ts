import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'hsnSerCodeFilter', pure: false })
export class hsnSerCodePipe implements PipeTransform {
    transform(servicesData: any, searchDescString: any): any {
        if (searchDescString == null ) return servicesData;
        // if (codeValue == null) return servicesData;
        
        return servicesData.filter(function (item) {
            return item.hsn_code.toLowerCase().indexOf(searchDescString.toLowerCase()) > -1 
            // item.description.toLowerCase().indexOf(codeValue.toLowerCase()) > -1
            ;
        })
    }
}
