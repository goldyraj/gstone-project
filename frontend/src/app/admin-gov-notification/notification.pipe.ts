import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'notifyFilter', pure: false })
export class NotifyPipe implements PipeTransform {
    transform(notificationList: any, searchString: any): any {
        if (searchString == null) return notificationList;

        return notificationList.filter(function (notify) {
            return notify.title.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
        })
    }
}
