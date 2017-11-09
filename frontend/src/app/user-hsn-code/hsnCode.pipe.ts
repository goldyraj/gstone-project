import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'hsnCodeFilter', pure: false })
export class hsnCodePipe implements PipeTransform {
    transform(hsnCodeData: any, searchString: any,codeValue,any): any {
        if (searchString == null) return hsnCodeData;

        return hsnCodeData.filter(function (state) {
            return state.description.toLowerCase().indexOf(searchString.toLowerCase()) > -1||
            state.code.toLowerCase().indexOf(searchString.toLowerCase()) > -1
            ;
        })
    }
}
