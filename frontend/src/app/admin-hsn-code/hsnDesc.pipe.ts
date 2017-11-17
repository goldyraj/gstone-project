import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'hsnDescFilter', pure: false })
export class hsnDescPipe implements PipeTransform {
    transform(goodsData: any, searchString: any): any {
        if (searchString == null ) return goodsData;
        // if (codeValue == null) return goodsData;
        
        return goodsData.filter(function (item) {
            return item.description.toLowerCase().indexOf(searchString.toLowerCase()) > -1 
            // item.description.toLowerCase().indexOf(codeValue.toLowerCase()) > -1
            ;
        })
    }
}
