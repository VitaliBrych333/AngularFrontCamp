import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { News } from '../../interfaces/news.interface';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.scss']
})
export class ListNewsComponent implements OnInit {

  public newsItems: News[];
  public currentItems: News[] = [];
  public isEmpty: boolean = false;

  filter = new FormGroup({
    keyWords: new FormControl()
  });

  source: string;
  isDisabled: boolean = false;


  constructor(private router: Router,
              private fb: FormBuilder,
              private dataService: DataService) { }

  ngOnInit(): void {
      this.dataService.currentNews.subscribe((data: News[]) => {
          this.newsItems = data;

          if (data.length < 5) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
      });

      this.filter = this.fb.group({
        keyWords: null,
      });
  }

  loadNews(event: any): void {
    this.isEmpty = true;
  }

  checkValue(event: any) {
    if (event.target.checked) {
      this.isDisabled = true;
      this.dataService.filterByMe();
    } else {
      this.isDisabled = false;
      this.dataService.getAllItems();
    }
  }

  filterSource(event: any) {
    if (event.target.value !== 'Select source') {
      this.source = event.target.value;
    }
  }

  filterByKeyWords() {
    if (this.filter.value.keyWords && this.source !== 'Select source') {
      this.dataService.filterByKeyWords(this.filter.value.keyWords, this.source)

    } else if (this.filter.value.keyWords && this.source === 'Select source') {
      this.dataService.filterByKeyWords(this.filter.value.keyWords, undefined);

    } else if (!this.filter.value.keyWords && this.source !== 'Select source') {
      this.dataService.filterByKeyWords(undefined, this.source);
    }
  }

}
