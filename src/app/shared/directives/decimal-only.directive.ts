import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimalOnly]',
  standalone: true
})
export class DecimalOnlyDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue: string = this.el.nativeElement.value;
    const sanitizedValue:string = initialValue.replace(/[^0-9.]/g, ''); // Allow only digits and dot
    const parts:string[] = sanitizedValue.split('.');
    if (parts.length > 2) {
      parts.pop();
      const integerPart:string|undefined = parts.shift();
      const decimalPart:string = parts.join('');
      this.el.nativeElement.value = integerPart + '.' + decimalPart;
    } else {
      this.el.nativeElement.value = sanitizedValue;
    }
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
