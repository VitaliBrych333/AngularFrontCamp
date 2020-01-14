import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {

    @Input() public content: string;
    @Input() public links: object[];
}
