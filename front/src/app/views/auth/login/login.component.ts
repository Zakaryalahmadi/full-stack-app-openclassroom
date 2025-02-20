import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  ],
  template: `
    <div class="flex flex-col items-center justify-center h-full">
      <h1>Connexion</h1>
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
        <button class="w-40" mat-raised-button color="primary">
          Se connecter
        </button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  readonly loginForm = new FormGroup<LoginForm>({
    usernameOrEmail: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });
}
