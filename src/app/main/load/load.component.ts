import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-load',
    templateUrl: './load.component.html',
    styleUrls: ['./load.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadComponent {

    @Output() public loadMore = new EventEmitter<boolean>();

    public loadNews(): void {
        this.loadMore.emit();
    }
}
