import { Directive, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[vexAlphaNumOnly]'
})
export class AlphaNumOnlyDirective {
  private readonly safeCharacters = /[a-zA-Z0-9 .,@#\-\s]/;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isSafeKey(event.key)) {
      event.preventDefault();
    }
  }

  private isSafeKey(key: string): boolean {
    return this.safeCharacters.test(key) || this.isSpecialKey(key);
  }

  private isSpecialKey(key: string): boolean {
    const specialKeys:string[] = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    return specialKeys.includes(key);
  }
}
