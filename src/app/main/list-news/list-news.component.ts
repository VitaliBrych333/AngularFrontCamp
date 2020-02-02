import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ComponentFactoryResolver,
         ViewChild, ViewContainerRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { News } from '../../interfaces/news.interface';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Authors } from '../../shared/constants/authors-enum';
import { Source } from '../../shared/constants/source-enum';
import { takeUntil} from 'rxjs/operators';
import { NewsItemComponent } from '../../shared/news-item/news-item.component';
import { FilterByKeyWordPipe } from '../../pipes/filter-by-key-word.pipe';

@Component({
    selector: 'app-list-news',
    templateUrl: './list-news.component.html',
    styleUrls: ['./list-news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ FilterByKeyWordPipe ]
})
export class ListNewsComponent implements OnInit, OnDestroy {

    public newsItems: News[];
    public currentItems: News[] = [];
    public isEmpty: boolean = false;

    public filter = new FormGroup({
        keyWords: new FormControl()
    });

    public source: string = null;
    public showSource: string = null;
    public isDisabled: boolean = false;

    private readonly unsubscribe$: Subject<boolean> = new Subject();

    @ViewChild('parent', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

    constructor(private fb: FormBuilder,
                private dataService: DataService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private filterPipe: FilterByKeyWordPipe) { }

    public ngOnInit(): void {
        this.filter = this.fb.group({
            keyWords: null,
        });

        this.dataService.currentNews
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data: News[]) => {
                this.newsItems = data.length !== 10 ? data.slice(0, 5)
                                                    : data;
                this.isEmpty = data.length < 5;
                this.createElementsNewsItem();
            });

        this.filter.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(val=> {
                val.keyWords.trim() ? this.createElementsNewsItem()
                                    : undefined;
        })
    }

    public createElementsNewsItem(): void {
        const viewContainerRef = this.container;
        viewContainerRef.clear();
        this.newsItems = this.filterPipe.transform(this.newsItems, this.filter.value.keyWords);

        for (let i = 0; i < this.newsItems.length; i++) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NewsItemComponent);
            const componentRef = viewContainerRef.createComponent(componentFactory);
            (<NewsItemComponent>componentRef.instance).item = this.newsItems[i];
            (<NewsItemComponent>componentRef.instance).listItems = this.newsItems;
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.unsubscribe();
    }

    public loadNews(event: Event): void {
        this.isEmpty = true;
    }

    public checkValue(event: { target: HTMLInputElement; }): void {
        if (event.target.checked) {
            this.isDisabled = true;
            this.dataService.filterByMe();
        } else {
            this.isDisabled = false;
            this.dataService.getAllItems();
        }
    }

    public filterSource(event: { target: HTMLInputElement; }): void {
        const valueSource = event.target.value;
        valueSource !== Source.DEFAULT ? this.source = valueSource
                                       : this.source = null;
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

        this.showSource = this.source;
    }
}
