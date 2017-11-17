import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'hsnCodeFilter', pure: false })
export class hsnCodePipe implements PipeTransform {
    transform(goodsData: any, searchString: any): any {
        if (searchString == null ) return goodsData;
        // if (codeValue == null) return goodsData;
        
        return goodsData.filter(function (item) {
            return item.hsn_code.toLowerCase().indexOf(searchString.toLowerCase()) > -1 
            // item.description.toLowerCase().indexOf(codeValue.toLowerCase()) > -1
            ;
        })
    }
}
