import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainViewComponent {

    @Input() public content: string;
    @Input() public links: object[];
}
