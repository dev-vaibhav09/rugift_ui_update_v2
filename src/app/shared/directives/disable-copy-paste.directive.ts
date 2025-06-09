import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appDisableCopyPaste]',
  standalone: true
})
export class DisableCopyPasteDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('copy', ['$event'])
  onCopy(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent copy
  }

  @HostListener('cut', ['$event'])
  onCut(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent copy
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent paste
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Prevent dragover
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault(); // Prevent drop
  }

}
