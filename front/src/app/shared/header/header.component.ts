import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: ` <header
    class="p-4 border-solid border-0 border-b border-black-900"
  >
    <img class="w-36" src="/assets/logo_p6.png" alt="logo" />
  </header>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
