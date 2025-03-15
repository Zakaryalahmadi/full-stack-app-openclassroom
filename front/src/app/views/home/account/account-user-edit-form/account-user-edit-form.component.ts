import { NavigationService } from './../../../../shared/services/navigation.service';
import { AuthenticationService } from 'src/app/core/ports/auth/authentication.service';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export type AccountUserEditForm = {
  username: FormControl<string>;
  email: FormControl<string>;
  newPassword: FormControl<string>;
};

@Component({
  selector: 'app-account-user-edit-form',
  template: `
    <div class="flex flex-col justify-center items-center ">
      <form class="flex flex-col w-96">
        <mat-form-field class="w-full" appearance="outline">
          <mat-label>username</mat-label>
          <input matInput [formControl]="userEditForm.controls.username" />
        </mat-form-field>
        <mat-form-field class="w-full" appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput [formControl]="userEditForm.controls.email" />
        </mat-form-field>
        <mat-form-field class="w-full" appearance="outline">
          <mat-label>Nouveau mot de passe</mat-label>
          <input matInput [formControl]="userEditForm.controls.newPassword" />
        </mat-form-field>
        <div class="flex items-center w-full flex-col gap-4">
          <button mat-raised-button class="w-40" color="primary">
            Sauvegarder
          </button>
        </div>
      </form>
      <button (click)="logout()" mat-button class="w-40" color="warn">
        Se déconnecter
      </button>
    </div>
  `,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AccountUserEditFormComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly navigationService = inject(NavigationService);

  readonly userEditForm = new FormGroup<AccountUserEditForm>({
    username: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    newPassword: new FormControl<string>('', { nonNullable: true }),
  });

  logout(): void {
    this.authenticationService.logout();
  }
}
