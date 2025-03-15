import { Directive, HostListener, inject } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[goBack]',
})
export class GoBackDirective {
  private readonly location = inject(Location);

  @HostListener('click')
  onClick() {
    this.location.back();
  }
}
