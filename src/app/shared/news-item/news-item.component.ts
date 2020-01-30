import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { News } from '../../interfaces/news.interface';
import { DataService } from '../../services/data.service';
import { Authors } from '../../shared/constants/authors-enum';

@Component({
    selector: 'app-news-item',
    templateUrl: './news-item.component.html',
    styleUrls: ['./news-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit {

    public isCurrentUser: boolean = false;

    @Input() public item: News;
    @Input() public listItems: News[];

    constructor(private dataService: DataService) { }

    public ngOnInit(): void {
        this.isCurrentUser = this.item.author === Authors.DEFAULT;
    }

    public delete(id: string): void {
        this.dataService.delete(this.listItems, id);
    }

}
