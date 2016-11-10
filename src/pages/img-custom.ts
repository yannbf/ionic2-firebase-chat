import { Component, Input } from '@angular/core';

@Component({
    selector: 'img-holder',
    template: `<img [src]="src || placeholder"/>`
})

export class ImageHolder {
    @Input() src: any;
    placeholder = 'assets/img/avatar/avatar-placeholder.png';

    constructor() {
    }
}