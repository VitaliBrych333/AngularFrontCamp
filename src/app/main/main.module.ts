import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { SelfPresentationComponent } from './self-presentation/self-presentation.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListNewsComponent } from './list-news/list-news.component';
import { LoadComponent } from './load/load.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsItemComponent } from '../shared/news-item/news-item.component';

@NgModule({
    declarations: [ NotFoundComponent, SelfPresentationComponent, HelloWorldComponent, ListNewsComponent, LoadComponent ],
    imports: [
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [ NewsItemComponent ],
    exports: [ NotFoundComponent, SelfPresentationComponent, HelloWorldComponent ]
})
export class MainModule { }
