import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthHeaderWidgetComponent } from '../components/auth-header-widget/auth-header-widget.component';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/app/core/ports/auth/authentication.service';
import { GoBackPageHeaderComponent } from '../../../shared/components/go-back-page-header/go-back-page-header.component';
import { catchError, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type LoginForm = {
  usernameOrEmail: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    AuthHeaderWidgetComponent,
    MatIconModule,
  ],
  template: `
    <div class="flex flex-col items-center h-full">
      <app-auth-header-widget class="w-full">
        <h1 auth-title>Connexion</h1>
      </app-auth-header-widget>
      <form class="flex items-center flex-col">
        <p>
          <mat-form-field class="w-96" appearance="outline">
            <mat-label>E-mail ou nom d'utilisateur</mat-label>
            <input
              matInput
              [formControl]="loginForm.controls.usernameOrEmail"
            />
          </mat-form-field>
        </p>
        <p>
          <mat-form-field class="w-96" appearance="outline">
            <mat-label>Mot de passe</mat-label>
            <input matInput [formControl]="loginForm.controls.password" />
          </mat-form-field>
        </p>
        <button
          class="w-40"
          mat-raised-button
          color="primary"
          (click)="onSubmit($event)"
        >
          Se connecter
        </button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private readonly authenticationService = inject(AuthenticationService);

  private readonly router = inject(Router);

  private destroyRef = inject(DestroyRef);

  readonly loginForm = new FormGroup<LoginForm>({
    usernameOrEmail: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.loginForm.invalid) return;

    const { usernameOrEmail, password } = this.loginForm.controls;

    this.authenticationService
      .login({
        identifier: usernameOrEmail.value,
        password: password.value,
      })
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
