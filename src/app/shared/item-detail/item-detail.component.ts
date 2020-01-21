import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { News } from '../../interfaces/news.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  public currentNews: News;
  public currentFieldEditId: string = this.router.url.slice(6);
  public youAuthor: boolean = false;

  protected readonly subscriptions: Subscription[] = [];

  constructor(private dataService: DataService,
              private router: Router) { }

  public ngOnInit(): void {
    this.dataService.currentNews.subscribe((data: News[]) => {
        this.currentNews = data.find((item: News) => item.id === this.currentFieldEditId);

        if (this.currentNews.author === 'Vitali') {
          this.youAuthor = true;
        } else {
          this.youAuthor = false;
        }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public delete(): void {
    console.log('delete')
  }

}
