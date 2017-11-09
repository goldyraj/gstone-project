import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'stateFilter', pure: false })
export class StatePipe implements PipeTransform {
    transform(stateList: any, searchString: any): any {
        if (searchString == null) return stateList;

        return stateList.filter(function (state) {
            return state.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
        })
    }
}
