import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Article } from '../../interfaces/article.interface';

@Component({
    selector: 'app-load',
    templateUrl: './load.component.html',
    styleUrls: ['./load.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadComponent {
    @Input() public news: Article[];
    @Input() public newsItems: Article[];
    @Output() public loadMore = new EventEmitter<boolean>();

    constructor(private dataService: DataService) { }

    public loadNews(currentItems: Article[], news: Article[]): void {
        this.dataService.loadNews(currentItems, news);
        this.loadMore.emit();
    }
}
