import { Pipe, PipeTransform } from '@angular/core';

/**
 * Search filter pipe
 */
@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(items: any[], field: string, query: string): any[] {
        if(!query) return items;
        query = query.toLowerCase();
        return items.filter(item => item[field].toLowerCase().indexOf(query) !== -1);
    }
}