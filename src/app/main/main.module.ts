import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { SelfPresentationComponent } from './self-presentation/self-presentation.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ NotFoundComponent, SelfPresentationComponent, HelloWorldComponent ],
    imports: [
        RouterModule,
        SharedModule
    ],
    exports: [ NotFoundComponent, SelfPresentationComponent, HelloWorldComponent ]
})
export class MainModule { }
