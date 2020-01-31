import { Pipe, PipeTransform } from '@angular/core';
import { News } from '../interfaces/news.interface';

@Pipe({
  name: 'filterByKeyWord'
})
export class FilterByKeyWordPipe implements PipeTransform {

    transform(items: News[], searchText: string): News[] {
        if (!items) { return []; }
        if (!searchText) { return items; }

        searchText = searchText.toLowerCase();

        return items.filter(obj =>
            obj.shortDescription.toLowerCase().includes(searchText));
        }
}
