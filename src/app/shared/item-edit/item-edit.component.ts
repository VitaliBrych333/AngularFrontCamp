import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { News } from 'src/app/interfaces/news.interface';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Path } from '../../shared/constants/path-enum';

@Component({
    selector: 'app-item-edit',
    templateUrl: './item-edit.component.html',
    styleUrls: ['./item-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ DatePipe ]
})
export class ItemEditComponent implements OnInit {

    public currentFieldEditId: string = this.activatedRouter.snapshot.paramMap.get('id');
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
                private activatedRouter: ActivatedRoute,
                private datePipe: DatePipe) { }

    public ngOnInit(): void {
        this.activatedRouter.snapshot.url[1].path === Path.NEWS ? this.setDefaultPropertiesForm()
                                                              : this.setCustomPropertiesForm();
    }

    public save(): void {
        console.log('save');
        this.router.navigate(['/main']);
    }

    public cancel(): void {
        console.log('cancel');
        this.router.navigate(['/main']);
    }

    public setDefaultPropertiesForm(): void {
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
    }

    public setCustomPropertiesForm(): void {
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
