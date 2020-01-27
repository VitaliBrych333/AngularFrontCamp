import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { News } from '../../interfaces/news.interface';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Authors } from '../../shared/constants/authors-enum';
import { Source } from '../../shared/constants/source-enum';

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

  protected readonly subscriptions: Subscription[] = [];


  constructor(private fb: FormBuilder,
              private dataService: DataService) { }

  public ngOnInit(): void {
      this.dataService.currentNews.subscribe((data: News[]) => {

          if (data.length !== 10) {
            this.newsItems = data.slice(0, 5);
          } else {
            this.newsItems = data;
          }

          if (data.length < 5) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
      });

      this.filter = this.fb.group({
        keyWords: null,
      });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public loadNews(event: any): void {
    this.isEmpty = true;
  }

  public checkValue(event: any) {
    if (event.target.checked) {
      this.isDisabled = true;
      this.dataService.filterByMe();
    } else {
      this.isDisabled = false;
      this.dataService.getAllItems();
    }
  }

  public filterSource(event: any): void {
    if (event.target.value !== Source.DEFAULT) {
      this.source = event.target.value;
    } else {
      this.source = null;
    }
  }

  public filterByKeyWords(): void {
    if (this.isDisabled && this.filter.value.keyWords) {
      this.dataService.filterByKeyWords(this.filter.value.keyWords, undefined, Authors.DEFAULT, this.newsItems);

    } else if (this.filter.value.keyWords && this.source !== Source.DEFAULT) {
      this.dataService.filterByKeyWords(this.filter.value.keyWords, this.source, undefined, this.newsItems)

    } else if (this.filter.value.keyWords && this.source === Source.DEFAULT) {
      this.dataService.filterByKeyWords(this.filter.value.keyWords, undefined, undefined, this.newsItems);

    } else if (!this.filter.value.keyWords && this.source !== Source.DEFAULT && this.source) {
      this.dataService.filterByKeyWords(undefined, this.source, undefined, this.newsItems);

    } else if (!this.filter.value.keyWords && !this.source && !this.isDisabled) {
      this.dataService.filterByKeyWords(undefined, undefined, undefined, this.newsItems);
    }

    this.showSource = this.source;
  }

}
