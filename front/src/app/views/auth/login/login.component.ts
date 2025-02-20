import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  template: `<p>login works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {}
