import { Component, OnInit, Input } from '@angular/core';
import { News } from '../../interfaces/news.interface';
import { DataService } from '../../services/data.service';
import { Authors } from '../../shared/constants/authors-enum';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  public youAuthor: boolean = false;

  @Input() public item: News;
  @Input() public listItems: News[];

  constructor(private dataService: DataService) { }

  public ngOnInit(): void {
    if (this.item.author === Authors.DEFAULT) {
      this.youAuthor = true;
    } else {
      this.youAuthor = false;
    }
  }

  public delete(id: string): void {
    this.dataService.delete(this.listItems, id);
  }

}
