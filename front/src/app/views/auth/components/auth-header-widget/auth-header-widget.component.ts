import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-header-widget',
  imports: [],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div>
        <img src="assets/logo_p6.png" alt="logo" class="block w-64 sm:hidden" />
      </div>
      <ng-content select="[auth-title]" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AuthHeaderWidgetComponent {}
