import { Signal } from '@angular/core';

export abstract class AuthenticationService {
  abstract getIsAuthenticated(): Signal<boolean>;

  abstract setIsAuthenticated(isAuthenticated: boolean): void;
}
