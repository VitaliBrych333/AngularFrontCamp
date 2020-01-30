import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { News } from '../interfaces/news.interface';
import { Router } from '@angular/router';
import { Authors } from '../shared/constants/authors-enum';
import { Filters } from '../shared/constants/filters';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public newsItems: News[] = [
        {
            id: '1',
            title: 'Text 1',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
            date: '11.03.2016',
            time: '13:01:01',
            author: 'Vitali',
            source: 'The inthernet'
        },
        {
            id: '2',
            title: 'Text 2',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
            date: '11.05.2018',
            time: '14:01:01',
            author: 'Vitali',
            source: 'The inthernet'
        },
        {
            id: '3',
            title: 'Text 3',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
            date: '11.03.2019',
            time: '14:01:01',
            author: 'John S.',
            source: 'The inthernet'
        },
        {
            id: '4',
            title: 'Text 4',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
            date: '11.06.2019',
            time: '10:01:01',
            author: 'Billy D',
            source: 'The inthernet'
        },
        {
            id: '5',
            title: 'Text 5',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
            date: '11.07.2019',
            time: '14:01:01',
            author: 'Vitali',
            source: 'The inthernet'
        },
        {
            id: '6',
            title: 'Text 6',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
            date: '11.09.2019',
            time: '14:01:01',
            author: 'John K.',
            source: 'The inthernet'
        },
        {
            id: '7',
            title: 'Text 7',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
            date: '11.09.2019',
            time: '19:01:01',
            author: 'Smith R.',
            source: 'The inthernet'
        },
        {
            id: '8',
            title: 'Text 8',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
            date: '11.03.2019',
            time: '14:03:01',
            author: 'no name',
            source: 'The inthernet'
        },
        {
            id: '9',
            title: 'Text 9',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
            date: '11.02.2019',
            time: '10:01:01',
            author: 'Vitali',
            source: 'The inthernet'
        },
        {
            id: '10',
            title: 'Text 10',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
            date: '11.03.2019',
            time: '14:04:01',
            author: 'John',
            source: 'The inthernet'
        }
    ];

    public newsSource = new BehaviorSubject<object>(this.newsItems.slice(0, 5));
    public currentNews = this.newsSource.asObservable();

    constructor(private router: Router) { }

    public delete(listItems: News[] | undefined, id: string): void {
        const deleteNews = listItems.find((item: News) => item.id === id);
        listItems.splice(listItems.indexOf(deleteNews), 1);
        this.newsSource.next(listItems);
        this.router.navigate(['/main']);
    }

    public loadNews(currentItems: News[]): void {
        this.newsSource.next(currentItems.concat(this.newsItems.slice(5)));
    }

    public getItem(id: string): News {
        return this.newsItems.find((item: News) => item.id === id);
    }

    public filterByMe(): void {
        this.newsSource.next(this.filter(this.newsItems, Authors.DEFAULT, Filters.byAuthor));
    }

    public getAllItems(): void {
        this.newsSource.next(this.newsItems.slice(0, 5));
    }

    public filter(data: News[], filterValue: string, filterType: any): News[] {
        return filterType(data, filterValue);
    }

    public filterByKeyWords(value: string | undefined,
                            author: string | undefined,
                            data: News[] | undefined): void {
        let newNews: News[];

        if (value) {
            newNews = this.filter(data, value, Filters.byValue);
            if (author) {
                newNews = this.filter(newNews, author, Filters.byAuthor);
            }

        } else {
            newNews = this.newsItems.slice(0, 5);
        }

        this.newsSource.next(newNews.slice(0, 5));
    }
}
