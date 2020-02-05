import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article.interface';

@Pipe({
    name: 'filterByKeyWord'
})
export class FilterByKeyWordPipe implements PipeTransform {

    transform(items: Article[], searchText: string): Article[] {
        if (!items) { return []; }
        if (!searchText) { return items; }

        searchText = searchText.toLowerCase();

        return items.filter(obj =>
            obj.description.toLowerCase().includes(searchText));
        }
}
