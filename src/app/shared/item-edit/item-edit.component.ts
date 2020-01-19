import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  newsItem = new FormGroup({
    heading: new FormControl(),
    description: new FormControl(),
    content: new FormControl(),
    link: new FormControl(),
    // file: new FormControl(),
    image: new FormControl(),
    date: new FormControl(),
    author: new FormControl(),
    source: new FormControl()
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.newsItem = this.fb.group({
      heading: '',
      description: '',
      content: '',
      link: '',
      image: '',
      date: '',
      author: '',
      source: ''
    });
  }

  save() {

  }

  cancel() {

  }
}
