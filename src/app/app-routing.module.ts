import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './main/not-found/not-found.component';
import { HelloWorldComponent } from './main/hello-world/hello-world.component';
import { SelfPresentationComponent } from './main/self-presentation/self-presentation.component';
import { ListNewsComponent } from './main/list-news/list-news.component';
import { ItemEditComponent } from './shared/item-edit/item-edit.component';
import { ItemDetailComponent } from './shared/item-detail/item-detail.component';

const routes: Routes = [
    { path: 'main', component: ListNewsComponent },
    { path: 'main/newNews', component: ItemEditComponent },
    { path: 'main/edit/:id', component: ItemEditComponent },
    { path: 'main/:id', component: ItemDetailComponent },
    { path: 'contact', component: SelfPresentationComponent },
    { path: '404', component: NotFoundComponent },
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: '**', redirectTo: '404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
