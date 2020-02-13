import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../interfaces/article.interface';
import { Authors } from '../shared/constants/authors-enum';
import { Filters } from '../shared/constants/filters';
import { HttpClient } from '@angular/common/http';
import { Api } from '../shared/constants/api-enum';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public newsItems: Article[] = [];
    public baseURL = 'https://newsapi.org/v2/';
    // public localBaseURL = 'http://localhost:5500';
    public localBaseURL = '';
    public options = { headers: {'Content-Type': 'application/json'} };

    public newsSource = new BehaviorSubject<object>(this.newsItems);
    public currentNews = this.newsSource.asObservable();

    constructor(private http: HttpClient) { }

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

    public getLocalNews(): Promise<Article[]> {
        return this.http.get<Article[]>(this.localBaseURL + '/news').toPromise();
    }

    public delete(item: Article): Promise<Article> {
        const id = item._id;
        return this.http.delete<Article>(this.localBaseURL + '/news' + `/${id}`).toPromise();
    }

    public getItem(id: string): Promise<Article> {
        return this.http.get<Article>(this.localBaseURL + '/news' + `/${id}`).toPromise();
    }

    public updateNews(id: string, item: Article): Promise<Article> {
        return this.http.put<Article>(this.localBaseURL + '/news' + `/${id}`, item).toPromise();
    }

    public addNews(item: Article): Promise<Article> {
        return this.http.post<Article>(this.localBaseURL + '/news', JSON.stringify(item), this.options).toPromise();
    }

    public getAllItems(): void {
        this.newsSource.next(this.newsItems.slice(0, 5));
    }

    public filter(data: Article[], filterValue: string, filterType: any): Article[] {
        return filterType(data, filterValue);
    }

    public filterByMe(): void {
        this.newsSource.next(this.filter(this.newsItems, Authors.DEFAULT, Filters.byAuthor));
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
