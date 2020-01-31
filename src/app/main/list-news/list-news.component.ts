import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { News } from '../../interfaces/news.interface';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Authors } from '../../shared/constants/authors-enum';
import { Source } from '../../shared/constants/source-enum';
import { takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-list-news',
    templateUrl: './list-news.component.html',
    styleUrls: ['./list-news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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

    constructor(private fb: FormBuilder,
                private dataService: DataService) { }

    public ngOnInit(): void {
        this.dataService.currentNews
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data: News[]) => {

              this.newsItems = data.length !== 10 ? data.slice(0, 5)
                                                  : data;
              this.isEmpty = data.length < 5;
            });

        this.filter = this.fb.group({
            keyWords: null,
        });
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
