import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ComponentFactoryResolver,
         ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Authors } from '../../shared/constants/authors-enum';
import { Source } from '../../shared/constants/source-enum';
import { takeUntil} from 'rxjs/operators';
import { NewsItemComponent } from '../../shared/news-item/news-item.component';
import { FilterByKeyWordPipe } from '../../pipes/filter-by-key-word.pipe';
import { RequestSource } from '../../interfaces/request-sources.interface';
import { Sources } from '../../interfaces/sources.interface';
import { Article } from '../../interfaces/article.interface';
import { RequestArticle } from '../../interfaces/request-articles.iterface';

@Component({
    selector: 'app-list-news',
    templateUrl: './list-news.component.html',
    styleUrls: ['./list-news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ FilterByKeyWordPipe ]
})
export class ListNewsComponent implements OnInit, OnDestroy {

    public newsItems: Article[] = [];
    public currentItems: Article[] = [];
    public isEmpty: boolean = false;

    public filter = new FormGroup({
        keyWords: new FormControl()
    });

    public source: string = null;
    public showSource: string = null;
    public isDisabled: boolean = false;
    public sources: Sources[];
    public allNews: Article[] = [];

    private readonly unsubscribe$: Subject<boolean> = new Subject();

    @ViewChild('parent', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

    constructor(private fb: FormBuilder,
                private dataService: DataService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private filterPipe: FilterByKeyWordPipe,
                private cdr: ChangeDetectorRef) { }

    public ngOnInit(): void {
        this.filter = this.fb.group({
            keyWords: null,
        });

        this.dataService.getLocalNews()
            .then((res: Article[]) => {
                this.allNews = res;
                this.dataService.setNews(res);
            })
            .catch(err => console.log('error', err));

        this.dataService.getListSources()
            .then((res: RequestSource) => {
                this.sources = res.sources;
                this.cdr.markForCheck();
            })
            .catch(err => console.log('errr', err));

        this.filter.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(val => {
                val.keyWords.trim() ? this.createElementsNewsItem()
                                    : undefined;
            });

        this.dataService.currentNews
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data: Article[]) => {
                  this.newsItems = [];
                  this.cdr.markForCheck();
                  this.showNews(data);
            });
    }

    public createElementsNewsItem(): void {
        const viewContainerRef = this.container;
        viewContainerRef.clear();
        this.newsItems = this.filterPipe.transform(this.newsItems, this.filter.value.keyWords);

        for (let i = 0; i < this.newsItems.length; i++) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NewsItemComponent);
            const componentRef = viewContainerRef.createComponent(componentFactory);
            (<NewsItemComponent>componentRef.instance).item = this.newsItems[i];
        }
    }

    public showNews(data: Article[] ): void {
        this.newsItems = data;
        this.isEmpty = data.length < 5;
        this.createElementsNewsItem();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.unsubscribe();
    }

    public loadNews(): void {
        const countCurrentArticle = this.newsItems.length;
        this.dataService.newsSource.next(this.allNews.slice(0, countCurrentArticle + 5));
        this.isEmpty = countCurrentArticle + 5 >= this.allNews.length;
    }

    public checkValue(event: { target: HTMLInputElement; }): void {
        if (event.target.checked) {
            this.isDisabled = true;
            this.dataService.filterByMe();
        } else {
            this.isDisabled = false;
            this.dataService.getAllItems();
        }
        this.showSource = '';
    }

    public filterSource(event: { target: HTMLInputElement; }): void {
        this.newsItems = [];
        const valueSource = event.target.value;
        valueSource !== Source.DEFAULT ? this.source = valueSource
                                       : this.source = null;

        if (this.source) {
          const resource = this.sources.find(item => item.name === valueSource).id;
          this.dataService.getNewsBySource(resource)
              .then((res: RequestArticle) => {
                  this.allNews = res.articles;
                  this.dataService.newsSource.next(this.allNews.slice(0, 5));
                  this.cdr.markForCheck();
                  this.showSource = valueSource;
              })
              .catch(err => console.log('errr', err));
        }
    }

    public filterByKeyWords(): void {
        const valueKeyWords = this.filter.value.keyWords;

        if (valueKeyWords || !this.isDisabled) {
            const keyWords = valueKeyWords ? valueKeyWords
                                           : undefined;

            const author = this.isDisabled ? Authors.DEFAULT
                                           : undefined;

            this.dataService.filterByKeyWords(keyWords, author, this.newsItems);

        } else {
            this.dataService.filterByMe();
        }

        this.showSource = !valueKeyWords ? null
                                         : this.source;
    }
}
