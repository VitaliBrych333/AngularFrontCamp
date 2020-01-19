import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.scss']
})
export class ListNewsComponent implements OnInit {

  newsItems: any = [1];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // showNewItem() {
  //   this.router.navigate(['/main/newNews']);
  // }

}
