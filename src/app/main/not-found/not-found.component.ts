import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    content: string;
    links: object[];

    constructor() { }

    ngOnInit() {
        this.content = 'Content not-found!';
        this.links = [
            { link: 'contact', name: 'About author' },
            { link: 'main', name: 'Hello World' }
        ]
    }

}
