import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { DataService } from '../../services/data.service';
import { Authors } from '../../shared/constants/authors-enum';
import { Path } from '../../shared/constants/path-enum';
import { Router } from '@angular/router';

@Component({
    selector: 'app-news-item',
    templateUrl: './news-item.component.html',
    styleUrls: ['./news-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit {

    public isCurrentUser: boolean = false;
    public propUrl: string;
    public propUrlImg: string;

    @Input() public item: Article;

    // we rewrite in list-news.component on componentFactory
    // @Input() public listItems: Article[];

    constructor(private dataService: DataService,
                private router: Router) { }

    public ngOnInit(): void {
        +this.item.source.id <= 10 ? this.propUrl = this.item.source.id
                                   : this.propUrl = this.item.title;

        this.propUrlImg = this.item.urlToImage ? this.item.urlToImage : Path.URLIMG;
        this.isCurrentUser = this.item.author === Authors.DEFAULT;
    }
}
