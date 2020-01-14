import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ SidebarComponent, MainViewComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [ CommonModule, SidebarComponent, MainViewComponent]
})
export class SharedModule { }
