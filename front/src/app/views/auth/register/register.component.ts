import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthHeaderWidgetComponent } from '../components/auth-header-widget/auth-header-widget.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RegisterFormComponent } from './register-form.component';

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
      <app-register-form />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {}
