import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../interfaces/article.interface';
import { Router } from '@angular/router';
import { Authors } from '../shared/constants/authors-enum';
import { Filters } from '../shared/constants/filters';
import { HttpClient } from '@angular/common/http';
import { Api } from '../shared/constants/api-enum';
import { RequestSource } from '../interfaces/request-sources.interface';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public newsItems: Article[] = [];

    // public newsItems: Article[] = [
    //     {
    //         source: { id: '1', name: 'The inthernet' },
    //         author: 'Vitali',
    //         title: 'Text 1',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing...',
    //         url: '',
    //         urlToImage: 'http://birolkahraman.com/application/assets/img/site/News.jpg',
    //         publishedAt: '2016-01-03T15:30:00Z',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
    //     },
    //     {
    //         source: { id: '2', name: 'The inthernet' },
    //         author: 'BBC',
    //         title: 'Text 2',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing...',
    //         url: '',
    //         urlToImage: 'http://birolkahraman.com/application/assets/img/site/News.jpg',
    //         publishedAt: '2019-01-03T15:31:00Z',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
    //     },
    //     {
    //         source: { id: '3', name: 'The inthernet' },
    //         author: 'Vitali',
    //         title: 'Text 3',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing...',
    //         url: '',
    //         urlToImage: 'http://birolkahraman.com/application/assets/img/site/News.jpg',
    //         publishedAt: '2017-01-03T15:30:00Z',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
    //     },
    //     {
    //         source: { id: '4', name: 'The inthernet' },
    //         author: 'BBC',
    //         title: 'Text 4',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing...',
    //         url: '',
    //         urlToImage: 'http://birolkahraman.com/application/assets/img/site/News.jpg',
    //         publishedAt: '2018-01-03T15:30:00Z',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
    //     },
    //     {
    //         source: { id: '5', name: 'The inthernet' },
    //         author: 'Vitali',
    //         title: 'Text 5',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing...',
    //         url: '',
    //         urlToImage: 'http://birolkahraman.com/application/assets/img/site/News.jpg',
    //         publishedAt: '2019-03-03T15:30:00Z',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
    //     },
    //     {
    //         source: { id: '6', name: 'The inthernet' },
    //         author: '',
    //         title: 'Text 6',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing...',
    //         url: '',
    //         urlToImage: 'http://birolkahraman.com/application/assets/img/site/News.jpg',
    //         publishedAt: '2018-01-05T15:30:00Z',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
    //     },
    //     {
    //         source: { id: '7', name: 'The inthernet' },
    //         author: 'Vitali',
    //         title: 'Text 7',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing...',
    //         url: '',
    //         urlToImage: 'http://birolkahraman.com/application/assets/img/site/News.jpg',
    //         publishedAt: '2019-01-03T15:30:00Z',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
    //     },
    //     {
    //         source: { id: '8', name: 'The inthernet' },
    //         author: 'Google',
    //         title: 'Text 8',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing...',
    //         url: '',
    //         urlToImage: 'http://birolkahraman.com/application/assets/img/site/News.jpg',
    //         publishedAt: '2019-01-03T15:30:00Z',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
    //     },
    //     {
    //         source: { id: '9', name: 'The inthernet' },
    //         author: '',
    //         title: 'Text 9',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing...',
    //         url: '',
    //         urlToImage: 'http://birolkahraman.com/application/assets/img/site/News.jpg',
    //         publishedAt: '2018-06-03T15:30:00Z',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
    //     },
    //     {
    //         source: { id: '10', name: 'The inthernet' },
    //         author: '',
    //         title: 'Text 10',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing...',
    //         url: '',
    //         urlToImage: 'http://birolkahraman.com/application/assets/img/site/News.jpg',
    //         publishedAt: '2019-01-03T15:30:00Z',
    //         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto animi architecto voluptatum sapiente natus ipsam eos, totam magnam corrupti facilis?',
    //     },
    // ];
    public baseURL = 'https://newsapi.org/v2/';

    public newsSource = new BehaviorSubject<object>(this.newsItems);
    public currentNews = this.newsSource.asObservable();

    constructor(private router: Router,
                private http: HttpClient) { }

    public getListSources(): Promise<object> {
        return this.http.get<object>(`${this.baseURL}sources?language=ru&apiKey=${Api.DEFAULT}`).toPromise();
    }

    public setNews(news: Article[]): void {
        this.newsSource.next(news.slice(0, 5));
        this.newsItems = news;
    }

    public getNewsBySource(resource: string): Promise<object> {
        const date = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const currentDate = `${year}-${month}-${date}`;

        return this.http.get<object>(`${this.baseURL}everything?sources=${resource}&from=${currentDate}&to=${currentDate}
                                      &pageSize=100&sortBy=popularity&apiKey=${Api.DEFAULT}`).toPromise();
    }

    public getLocalNews(): Promise<object> {
        return this.http.get<object>('assets/data.json').toPromise();
    }

    public delete(listItems: Article[] | undefined, id: string): void {
        const deleteNews = listItems.find((item: Article) => item.source.id === id);
        listItems.splice(listItems.indexOf(deleteNews), 1);
        this.newsSource.next(listItems);
        this.router.navigate(['/main']);
    }

    public loadNews(currentItems: Article[], news: Article[]): void {
        news.length !== 5 ? this.newsSource.next(currentItems.concat(news.slice(currentItems.length, currentItems.length + 5)))
                          : this.newsSource.next(currentItems.concat(this.newsItems.slice(5)));
    }

    public getItem(id: string): Article {
        return this.newsItems.find((item: Article) => item.source.id === id);
    }

    public filterByMe(): void {
        this.newsSource.next(this.filter(this.newsItems, Authors.DEFAULT, Filters.byAuthor));
    }

    public updateNews(news: Article): Promise<object> {
        return this.http.post<object>('assets/data.json', news).toPromise();
    }

    public getAllItems(): void {
        this.newsSource.next(this.newsItems.slice(0, 5));
    }

    public filter(data: Article[], filterValue: string, filterType: any): Article[] {
        return filterType(data, filterValue);
    }

    public filterByKeyWords(value: string | undefined,
                            author: string | undefined,
                            data: Article[] | undefined): void {
        let newNews: Article[];

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
