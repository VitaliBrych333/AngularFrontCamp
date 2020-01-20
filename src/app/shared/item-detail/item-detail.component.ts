import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { News } from '../../interfaces/news.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  currentNews: News;
  currentFieldEditId: string = this.router.url.slice(6);

  constructor(private dataService: DataService,
              private router: Router) { }

  public ngOnInit(): void {
    this.dataService.currentNews.subscribe((data: News[]) => {
        this.currentNews = data.find((item: News) => item.id === this.currentFieldEditId);
    });
  }

  public delete(): void {
    console.log('delete')
  }

}
