import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthHeaderWidgetComponent } from '../components/auth-header-widget/auth-header-widget.component';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/app/core/ports/auth/authentication.service';

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
    RouterLink,
  ],
  template: `
    <div class="flex flex-col h-full">
      <mat-icon class="cursor-pointer m-8" routerLink="/">arrow_back</mat-icon>
      <div class="flex flex-col items-center justify-center h-full">
        <app-auth-header-widget>
          <h1 auth-title>Connexion</h1>
        </app-auth-header-widget>
        <form class="flex items-center flex-col">
          <p>
            <mat-form-field class="w-64" appearance="outline">
              <mat-label>E-mail ou nom d'utilisateur</mat-label>
              <input
                matInput
                [formControl]="loginForm.controls.usernameOrEmail"
              />
            </mat-form-field>
          </p>
          <p>
            <mat-form-field class="w-64" appearance="outline">
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
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  readonly loginForm = new FormGroup<LoginForm>({
    usernameOrEmail: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });

  onSubmit(event: Event): void {
    event.preventDefault();
  }
}
