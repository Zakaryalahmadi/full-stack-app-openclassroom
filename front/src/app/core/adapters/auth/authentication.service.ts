import { HttpClient } from '@angular/common/http';
import {
  AuthenticationService,
  LoginRequestDto,
  RegisterRequestDto,
} from '../../ports/auth/authentication.service';
import { inject, Signal, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';

export class AuthenticationServiceImpl extends AuthenticationService {
  private readonly httpClient = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly isAuthenticated = signal(this.tokenService.hasToken());
  private readonly navigationService = inject(NavigationService);

  private readonly authenticationBaseUrl = `${environment.backendBaseUrl}/auth`;

  login(loginRequest: LoginRequestDto): Observable<User> {
    return this.httpClient.post<User>(
      `${this.authenticationBaseUrl}/login`,
      loginRequest
    );
  }

  setAuthenticated(user: User): void {
    this.tokenService.setToken(user.token);
    this.isAuthenticated.set(true);
  }

  getIsAuthenticated(): Signal<boolean> {
    return this.isAuthenticated;
  }

  logout(): void {
    this.navigationService.navigateToLogin();
    this.tokenService.removeToken();
    this.isAuthenticated.set(false);
  }

  register(registerRequest: RegisterRequestDto): Observable<User> {
    return this.httpClient.post<User>(
      `${this.authenticationBaseUrl}/register`,
      registerRequest
    );
  }
}
