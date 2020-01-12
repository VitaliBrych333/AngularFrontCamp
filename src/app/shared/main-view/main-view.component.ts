import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

    @Input() content: string;
    @Input() links: object[];

    constructor() { }

    ngOnInit() {
    }
}
