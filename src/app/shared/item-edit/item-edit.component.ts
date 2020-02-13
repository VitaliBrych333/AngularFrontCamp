import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article.interface';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Path } from '../../shared/constants/path-enum';
import { Authors } from '../../shared/constants/authors-enum';
import { Source } from '../../shared/constants/source-enum';

@Component({
    selector: 'app-item-edit',
    templateUrl: './item-edit.component.html',
    styleUrls: ['./item-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ DatePipe ]
})
export class ItemEditComponent implements OnInit {

    public currentFieldEditId: string = this.activatedRouter.snapshot.paramMap.get('id');
    public valueCheckBox: string = Source.VALCHECKBOX;

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
            source: { id: (Math.floor(Math.random() * 99 + 2)).toString(), name: Authors.SOURCE },
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
    }

    public setDefaultPropertiesForm(): void {
        this.newsItem = this.fb.group({
            heading: [ null, Validators.required ],
            description: [ null, Validators.required ],
            content: [ null, Validators.required ],
            image: [ Path.URLIMG, Validators.required ],
            link: null,
            date: [ this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required ],
            author: [ Authors.DEFAULT, Validators.required ],
            source: [ null, Validators.required ]
        });
    }

    public setCustomPropertiesForm(): void {
        this.dataService.getItem(this.currentFieldEditId)
            .then(res => {
                this.setValueForm(res);
            })
            .catch(err => console.log('error', err));
    }

    private setValueForm(article: Article): void {
        const datePipe = this.datePipe.transform(article.publishedAt.slice(0, 10), 'yyyy-MM-dd');
        this.newsItem.setValue({
            heading: article.title,
            description: article.description,
            content: article.content,
            image: article.urlToImage,
            link: null,
            date: datePipe,
            author: article.author,
            source: article.source.name
        });

        this.newsItem.get('heading').setValidators(Validators.required);
        this.newsItem.get('description').setValidators(Validators.required);
        this.newsItem.get('content').setValidators(Validators.required);
        this.newsItem.get('image').setValidators(Validators.required);
        this.newsItem.get('author').setValidators(Validators.required);
        this.newsItem.get('source').setValidators(Validators.required);
    }
}
