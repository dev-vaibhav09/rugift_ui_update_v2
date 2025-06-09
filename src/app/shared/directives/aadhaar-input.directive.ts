import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAadhaarInput]',
  standalone: true,
})
export class AadhaarInputDirective {
  @Input() maxLength: number = 14; // Define a default maxLength

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput() {
    this.formatInput(this.el.nativeElement);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.handleBackspace();
      event.preventDefault(); // Prevent the default behavior of the backspace key
    }
  }

  private formatInput(input: HTMLInputElement) {
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (!value || value.length > this.maxLength) {
      input.value = value.slice(0, this.maxLength); // Limit input to maxLength
    } else {
      const formattedValue = value.replace(/(\d{4})/g, '$1-'); // Add hyphen after every 4 characters
      input.value = formattedValue.slice(0, this.maxLength); // Limit input to maxLength after formatting
    }
  }

  private handleBackspace() {
    let value = this.el.nativeElement.value.replace(/\D/g, ''); // Remove non-numeric characters
    value = value.slice(0, -1); // Remove last character

    const formattedValue = value.replace(/(\d{4})/g, '$1-'); // Add hyphen after every 4 characters
    this.el.nativeElement.value = formattedValue.slice(0, this.maxLength); // Limit input to maxLength after formatting
  }
}
