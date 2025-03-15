import { Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

export type LoginRequestDto = {
  identifier: string;
  password: string;
};

export abstract class AuthenticationService {
  abstract login(loginRequest: LoginRequestDto): Observable<User>;
  abstract setAuthenticated(user: User): void;
  abstract getIsAuthenticated(): Signal<boolean>;
  abstract getIsAuthenticated(): Signal<boolean>;
  abstract logout(): void;
}
