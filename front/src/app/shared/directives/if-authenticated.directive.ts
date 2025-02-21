import { NgIf } from '@angular/common';
import { Directive, inject, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/ports/auth/authentication.service';

@Directive({
  selector: '[IfAuthenticated]',
  hostDirectives: [
    {
      directive: NgIf,
    },
  ],
})
export class IfAuthenticatedDirective implements OnInit {
  private readonly isAuthenticated = inject(
    AuthenticationService
  ).getIsAuthenticated();

  private ngIfDirective = inject(NgIf);

  ngOnInit() {
    this.ngIfDirective.ngIf = this.isAuthenticated();
  }
}
