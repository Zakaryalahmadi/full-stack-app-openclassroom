import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthHeaderWidgetComponent } from '../components/auth-header-widget/auth-header-widget.component';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { RegisterFormComponent } from './register-form.component';
import {
  AuthenticationService,
  RegisterRequestDto,
} from 'src/app/core/ports/auth/authentication.service';
import { take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthHeaderWidgetComponent,
    MatIconModule,
    RegisterFormComponent,
  ],
  template: `
    <div class="flex flex-col items-center  h-full">
      <app-auth-header-widget class="w-full">
        <h1 auth-title>Inscription</h1>
      </app-auth-header-widget>
      <app-register-form (registerTrigger)="onRegister($event)" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  onRegister(registerRequest: RegisterRequestDto): void {
    this.authenticationService
      .register(registerRequest)
      .pipe(
        tap((user) => {
          this.authenticationService.setAuthenticated(user);
          this.router.navigate(['/home']);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
