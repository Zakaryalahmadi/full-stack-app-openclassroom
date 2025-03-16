import { environment } from 'src/environments/environment';
import { UpdateUserDto, User } from '../../models/user.model';
import { UserGateway } from '../../ports/user/user.gateway';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class UserApi extends UserGateway {
  private readonly authenticationBaseUrl = `${environment.backendBaseUrl}/auth`;
  private readonly httpClient = inject(HttpClient);

  getCurrentUser$(): Observable<User> {
    return this.httpClient.get<User>(`${this.authenticationBaseUrl}/me`);
  }

  updateUser$(updateUserDto: UpdateUserDto): Observable<User> {
    return this.httpClient.patch<User>(
      `${this.authenticationBaseUrl}/me`,
      updateUserDto
    );
  }
}
