import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { SelfPresentationComponent } from './self-presentation/self-presentation.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { MainViewComponent } from '../shared/main-view/main-view.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ NotFoundComponent, SelfPresentationComponent, HelloWorldComponent, MainViewComponent, SidebarComponent ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [ NotFoundComponent, SelfPresentationComponent, HelloWorldComponent ]
})
export class MainModule { }
