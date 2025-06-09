import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appMobileNumberValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MobileNumberValidatorDirective,
      multi: true
    }
  ]
})
export class MobileNumberValidatorDirective implements Validator {
  @Input() errorMessage: string = 'Invalid mobile number. Please enter exactly 10 digits.';
  private regex = /^[0-9]{10}$/; // Matches exactly 10 digits

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !this.regex.test(value)) {
      return { invalidMobileNumber: this.errorMessage }; // Matches the check in *ngIf
    }
    return null;
  }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove non-numeric characters
    value = value.replace(/[^0-9]/g, '');

    // Limit to 10 digits
    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    // Update the input value
    this.renderer.setProperty(this.el.nativeElement, 'value', value);
  }
}
