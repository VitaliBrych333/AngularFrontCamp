import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { News } from '../../interfaces/news.interface';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {

  @Input() public newsItems: News[];
  @Output() public loadMore = new EventEmitter<boolean>();

  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
  }

  loadNews(currentItems: News[]): void {
    this.dataService.loadNews(currentItems);
    this.loadMore.emit();
  }

}
