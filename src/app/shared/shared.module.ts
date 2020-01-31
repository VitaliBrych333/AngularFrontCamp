import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { RouterModule } from '@angular/router';
import { NewsItemComponent } from './news-item/news-item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByKeyWordPipe } from '../pipes/filter-by-key-word.pipe';

@NgModule({
    declarations: [ SidebarComponent, MainViewComponent, NewsItemComponent, ItemDetailComponent, ItemEditComponent, FilterByKeyWordPipe ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [ CommonModule, SidebarComponent, MainViewComponent, NewsItemComponent, ItemDetailComponent, ItemEditComponent,
               FilterByKeyWordPipe ]
})
export class SharedModule { }
