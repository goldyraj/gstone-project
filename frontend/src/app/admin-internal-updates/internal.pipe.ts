import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'updateFilter', pure: false })
export class InternalUpdatePipe implements PipeTransform {
    transform(internalUpdateList: any, searchString: any): any {
        if (searchString == null) return internalUpdateList;

        return internalUpdateList.filter(function (internal) {
            return internal.title.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
        })
    }
}
