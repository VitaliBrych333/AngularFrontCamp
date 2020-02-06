import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Article } from '../../interfaces/article.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Authors } from '../../shared/constants/authors-enum';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { Path } from '../constants/path-enum';

@Component({
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailComponent implements OnInit, OnDestroy {

    public currentNews: Article;
    public currentFieldEditId: string = this.activatedRouter.snapshot.paramMap.get('id');
    public isCurrentUser: boolean = false;
    public propUrlImg: string;

    private readonly unsubscribe$: Subject<boolean> = new Subject();

    constructor(private dataService: DataService,
                private activatedRouter: ActivatedRoute,
                private router: Router) { }

    public ngOnInit(): void {
        this.dataService.currentNews
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data: Article[]) => {
                +this.currentFieldEditId <= 10 ? this.currentNews = data.find((item: Article) => item.source.id === this.currentFieldEditId)
                                               : this.currentNews = data.find((item: Article) => item.title === this.currentFieldEditId);

                this.propUrlImg = this.currentNews.urlToImage ? this.currentNews.urlToImage : Path.URLIMG;
                this.isCurrentUser = this.currentNews.author === Authors.DEFAULT;
            });
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.unsubscribe();
    }

    public delete(item: Article): void {
      this.dataService.delete(item)
          .then(res => {
              this.router.navigate(['/main']);
          })
          .catch(err => console.log('error', err));
    }
}
