import { AuthenticationService } from '../../ports/auth/authentication.service';
import { Signal, signal } from '@angular/core';

export class AuthenticationServiceImpl extends AuthenticationService {
  private readonly isAuthenticated = signal(true);

  getIsAuthenticated(): Signal<boolean> {
    return this.isAuthenticated;
  }

  setIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated.set(isAuthenticated);
  }
}
