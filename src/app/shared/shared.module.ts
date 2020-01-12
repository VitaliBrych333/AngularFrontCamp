import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainViewComponent } from './main-view/main-view.component';



@NgModule({
    declarations: [ SidebarComponent, MainViewComponent],
    imports: [
        CommonModule
    ],
    exports: [ SidebarComponent, MainViewComponent]
})
export class SharedModule { }
