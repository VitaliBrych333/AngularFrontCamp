import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './main/not-found/not-found.component';
import { HelloWorldComponent } from './main/hello-world/hello-world.component';
import { SelfPresentationComponent } from './main/self-presentation/self-presentation.component';

const routes: Routes = [
    { path: 'main', component: HelloWorldComponent },
    { path: 'contact', component: SelfPresentationComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
