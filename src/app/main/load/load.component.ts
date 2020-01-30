import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { News } from '../../interfaces/news.interface';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadComponent {

  @Input() public newsItems: News[];
  @Output() public loadMore = new EventEmitter<boolean>();

  constructor(private dataService: DataService) { }

  public loadNews(currentItems: News[]): void {
    this.dataService.loadNews(currentItems);
    this.loadMore.emit();
  }
}
