import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

    constructor(private _el: ElementRef) {
    }

    @HostListener('input', ['$event']) onInputChange(event: { stopPropagation: () => void; }) {
        const initialValue = this._el.nativeElement.value;
        this._el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
        if (initialValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }

}
