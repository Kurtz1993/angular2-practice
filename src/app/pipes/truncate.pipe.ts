import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, ...args: any[]): string {
        let length = args[0];
        let endString = '...';
        if (isNaN(length)) {
            length = 10;
        }

        if (!value) {
            value = '   ';
        }

        if(value.length <= length || value.length - endString.length <= length) {
            return value;
        } else {
            return `${value.substring(0, length - endString.length)}${endString}`;
        }
    }
}