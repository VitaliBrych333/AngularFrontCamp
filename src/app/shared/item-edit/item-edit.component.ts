import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article.interface';
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
    public currenttItem: Article;
    public valueCheckBox: string = 'file';

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

    public changeValue(event: any): void {
        this.valueCheckBox = event.target.value;
    }

    public save(): void {
        const news: Article = {
            source: { id: (Math.floor(Math.random() * 99 + 2)).toString(), name: 'The inthernet'},
            author: this.newsItem.value.author,
            title: this.newsItem.value.heading,
            description: this.newsItem.value.description,
            url: this.valueCheckBox,
            urlToImage: this.newsItem.value.image,
            publishedAt: this.newsItem.value.date,
            content: this.newsItem.value.content
        };

        const currentUrl = this.activatedRouter.snapshot.routeConfig.path;

        currentUrl === Path.ADDNEWS ? this.dataService.addNews(news)
                                       .then(res => this.router.navigate(['/main']))
                                       .catch(err => console.log('error', err))
                                 : this.dataService.updateNews(this.currentFieldEditId, news)
                                       .then(res => this.router.navigate(['/main']))
                                       .catch(err => console.log('error', err));
    }

    public cancel(): void {
        this.router.navigate(['/main']);
        console.log('cancel');

    }

    public setDefaultPropertiesForm(): void {
        this.newsItem = this.fb.group({
            heading: [ null, Validators.required ],
            description: [ null, Validators.required ],
            content: [ null, Validators.required ],
            image: [ null, Validators.required ],
            link: null,
            date: [ this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required ],
            author: [ null, Validators.required ],
            source: [ null, Validators.required ]
        });
    }

    public setCustomPropertiesForm(): void {
        this.dataService.getItem(this.currentFieldEditId)
            .then(res => {
                this.currenttItem = res;
                const datePipe = this.datePipe.transform(this.currenttItem.publishedAt.slice(0, 10), 'yyyy-MM-dd');

                this.newsItem.setValue({
                    heading: this.currenttItem.title,
                    description: this.currenttItem.description,
                    content: this.currenttItem.content,
                    image: this.currenttItem.urlToImage,
                    link: null,
                    date: datePipe,
                    author: this.currenttItem.author,
                    source: this.currenttItem.source.name
                });

                this.newsItem.get('heading').setValidators(Validators.required);
                this.newsItem.get('description').setValidators(Validators.required);
                this.newsItem.get('content').setValidators(Validators.required);
                this.newsItem.get('image').setValidators(Validators.required);
                // this.newsItem.get('link').setValidators(Validators.required);
                this.newsItem.get('author').setValidators(Validators.required);
                this.newsItem.get('source').setValidators(Validators.required);
            })
            .catch(err => console.log('error', err));
    }
}
