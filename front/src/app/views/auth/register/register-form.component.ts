import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export type RegisterForm = {
  username: FormControl<string | null>;
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-register-form',
  template: `
    <form class="flex items-center flex-col">
      <p>
        <mat-form-field class="w-96" appearance="outline">
          <mat-label>Nom d'utilisateur</mat-label>
          <input matInput [formControl]="registerForm.controls.username" />
        </mat-form-field>
      </p>
      <p>
        <mat-form-field class="w-96" appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput [formControl]="registerForm.controls.email" />
        </mat-form-field>
      </p>
      <p>
        <mat-form-field class="w-96" appearance="outline">
          <mat-label>Mot de passe</mat-label>
          <input matInput [formControl]="registerForm.controls.password" />
        </mat-form-field>
      </p>
      <button class="w-40" mat-raised-button color="primary">S'inscrire</button>
    </form>
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class RegisterFormComponent {
  readonly registerForm = new FormGroup<RegisterForm>({
    username: new FormControl<string | null>(null, { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });
}
