import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { RouterModule } from '@angular/router';
import { NewsItemComponent } from './news-item/news-item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByKeyWordPipe } from '../pipes/filter-by-key-word.pipe';
import { createCustomElement } from '@angular/elements';

@NgModule({
    declarations: [ SidebarComponent, MainViewComponent, NewsItemComponent, ItemDetailComponent, ItemEditComponent, FilterByKeyWordPipe ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [ ItemDetailComponent ],
    exports: [ CommonModule, SidebarComponent, MainViewComponent, NewsItemComponent, ItemDetailComponent, ItemEditComponent,
               FilterByKeyWordPipe ]
})
export class SharedModule {
    constructor(private injector: Injector) {
        const customElement = createCustomElement(ItemDetailComponent, { injector });
        customElements.define('app-item-detail', customElement);
    }
}
