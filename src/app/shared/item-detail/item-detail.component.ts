import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { News } from '../../interfaces/news.interface';
import { ActivatedRoute } from '@angular/router';
import { Authors } from '../../shared/constants/authors-enum';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  public currentNews: News;
  public currentFieldEditId: string = this.activatedRouter.snapshot.paramMap.get('id');
  public isCurrentUser: boolean = false;

  private readonly unsubscribe$: Subject<boolean> = new Subject();

  constructor(private dataService: DataService,
              private activatedRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    this.dataService.currentNews
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: News[]) => {
        this.currentNews = data.find((item: News) => item.id === this.currentFieldEditId);
        this.isCurrentUser = this.currentNews.author === Authors.DEFAULT;
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  public delete(): void {
    console.log('delete');
  }

}
