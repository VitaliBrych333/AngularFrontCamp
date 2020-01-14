import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hello-world',
    templateUrl: './hello-world.component.html',
    styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent implements OnInit {

    protected content: string;
    protected links: object[];

    ngOnInit(): void {
        this.content = 'Hello world!';
        this.links = [
            { link: 'contact', name: 'About author' },
        ];
    }

}
