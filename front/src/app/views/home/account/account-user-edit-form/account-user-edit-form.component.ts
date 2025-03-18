import { NavigationService } from './../../../../shared/services/navigation.service';
import { AuthenticationService } from 'src/app/core/ports/auth/authentication.service';
import {
  Component,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserGateway } from 'src/app/core/ports/user/user.gateway';
import { toSignal } from '@angular/core/rxjs-interop';
import { UpdateUserDto, User } from 'src/app/core/models/user.model';
import { exhaustMap, Subject } from 'rxjs';

export type AccountUserEditForm = {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-account-user-edit-form',
  template: `
    <div class="flex flex-col justify-center items-center ">
      <form class="flex flex-col w-1/2">
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
          <input matInput [formControl]="userEditForm.controls.password" />
        </mat-form-field>
        <div class="flex items-center w-full flex-col gap-4">
          <button
            (click)="editUser($event)"
            mat-raised-button
            class="w-40"
            color="primary"
          >
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountUserEditFormComponent {
  readonly updateUserTrigger = output<UpdateUserDto>();

  readonly currentUser = input.required<User | undefined>();

  private readonly authenticationService = inject(AuthenticationService);

  readonly userEditForm = new FormGroup<AccountUserEditForm>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(3)],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(3)],
    }),
  });

  logout(): void {
    this.authenticationService.logout();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentUser']) {
      this.setUserFormValues(this.currentUser());
    }
  }

  setUserFormValues(user: User | undefined): void {
    if (!user) throw new Error('User is undefined');
    this.userEditForm.patchValue({
      username: user.username,
      email: user.email,
    });
  }

  editUser(event: Event): void {
    event.preventDefault();
    if (this.userEditForm.valid) {
      this.updateUserTrigger.emit(this.userEditForm.getRawValue());
    }
  }
}
