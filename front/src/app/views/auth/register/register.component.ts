import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  ],
  template: `
    <div class="flex flex-col items-center justify-center">
      <h1>Inscription</h1>
      <form class="flex items-center flex-col" [formGroup]="registerForm">
        <p>
          <mat-form-field class="w-64" appearance="outline">
            <mat-label>Nom d'utilisateur</mat-label>
            <input matInput formControlName="username" />
          </mat-form-field>
        </p>
        <p>
          <mat-form-field class="w-64" appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" />
          </mat-form-field>
        </p>
        <p>
          <mat-form-field class="w-64" appearance="outline">
            <mat-label>Mot de passe</mat-label>
            <input matInput formControlName="password" />
          </mat-form-field>
        </p>
        <button class="w-40" mat-raised-button color="primary">
          S'inscrire
        </button>
      </form>
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
