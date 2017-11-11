import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'videosFilter', pure: false })
export class videosPipe implements PipeTransform {
    transform(videosList: any, searchString: any): any {
        if (searchString == null) return videosList;

        return videosList.filter(function (videos) {
            return videos.title.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
        })
    }
}
