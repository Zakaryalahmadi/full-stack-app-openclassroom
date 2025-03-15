import { NgIf } from '@angular/common';
import {
  Directive,
  effect,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  input,
  Input,
} from '@angular/core';
import { AuthenticationService } from 'src/app/core/ports/auth/authentication.service';

@Directive({
  selector: '[IfAuthenticated]',
  hostDirectives: [
    {
      directive: NgIf,
    },
  ],
})
export class IfAuthenticatedDirective {
  private readonly authenticationService = inject(AuthenticationService);

  private ngIfDirective = inject(NgIf);

  constructor() {
    effect(() => {
      const isAuthenticated = this.authenticationService.getIsAuthenticated()();
      this.ngIfDirective.ngIf = isAuthenticated;
    });
  }
}
