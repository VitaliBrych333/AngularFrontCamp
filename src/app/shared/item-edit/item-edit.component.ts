import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { News } from 'src/app/interfaces/news.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
  providers: [ DatePipe ]
})
export class ItemEditComponent implements OnInit {

  public currentFieldEditId: string = this.router.url.slice(11);
  public currenttItem: News;

  public newsItem = new FormGroup({
    heading: new FormControl(),
    description: new FormControl(),
    content: new FormControl(),
    link: new FormControl(),
    image: new FormControl(),
    date: new FormControl(),
    author: new FormControl(),
    source: new FormControl()
  });

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private router: Router,
              private datePipe: DatePipe) { }

  public ngOnInit(): void {

    if (this.router.url.slice(6) === 'newNews') {

      this.newsItem = this.fb.group({
        heading: null,
        description: null,
        content: null,
        image: null,
        url: null,
        link: null,
        date: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        author: null,
        source: null
      });

    } else {

      this.currenttItem = this.dataService.getItem(this.currentFieldEditId);
      const date = this.datePipe.transform(this.currenttItem.date, 'yyyy-MM-dd');

      this.newsItem = this.fb.group({
        heading: [this.currenttItem.title],
        description: [this.currenttItem.shortDescription],
        content: [this.currenttItem.content],
        image: [null],
        url: [null],
        link: [null],
        date: [date],
        author: [this.currenttItem.author],
        source: [this.currenttItem.source]
      });
    }
  }

  public save(): void {
    console.log('save');
    this.router.navigate(['/main']);
  }

  public cancel(): void {
    console.log('cancel');
    this.router.navigate(['/main']);
  }
}
