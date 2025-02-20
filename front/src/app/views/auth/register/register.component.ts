import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthHeaderWidgetComponent } from '../components/auth-header-widget/auth-header-widget.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export type RegisterForm = {
  username: FormControl<string | null>;
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthHeaderWidgetComponent,
    MatIconModule,
    RouterLink,
  ],
  template: `
    <div class="flex flex-col h-full">
      <mat-icon class="cursor-pointer m-8" routerLink="/">arrow_back</mat-icon>
      <div class="flex flex-col items-center justify-center h-full">
        <app-auth-header-widget>
          <h1 auth-title>Inscription</h1>
        </app-auth-header-widget>
        <form class="flex items-center flex-col">
          <p>
            <mat-form-field class="w-64" appearance="outline">
              <mat-label>Nom d'utilisateur</mat-label>
              <input matInput [formControl]="registerForm.controls.username" />
            </mat-form-field>
          </p>
          <p>
            <mat-form-field class="w-64" appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput [formControl]="registerForm.controls.email" />
            </mat-form-field>
          </p>
          <p>
            <mat-form-field class="w-64" appearance="outline">
              <mat-label>Mot de passe</mat-label>
              <input matInput [formControl]="registerForm.controls.password" />
            </mat-form-field>
          </p>
          <button class="w-40" mat-raised-button color="primary">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  readonly registerForm = new FormGroup<RegisterForm>({
    username: new FormControl<string | null>(null, { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });
}
