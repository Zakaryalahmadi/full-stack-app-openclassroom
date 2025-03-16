import { Observable } from 'rxjs';
import { UpdateUserDto, User } from './../../models/user.model';

export abstract class UserGateway {
  abstract getCurrentUser$(): Observable<User>;
  abstract updateUser$(user: UpdateUserDto): Observable<User>;
}
