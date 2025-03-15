import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GoBackPageHeaderComponent } from '../../../../shared/components/go-back-page-header/go-back-page-header.component';

@Component({
  selector: 'app-auth-header-widget',
  imports: [GoBackPageHeaderComponent],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div>
        <img src="assets/logo_p6.png" alt="logo" class="block w-64 sm:hidden" />
      </div>
      <app-go-back-page-header class="w-full">
        <ng-content select="[auth-title]" />
      </app-go-back-page-header>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AuthHeaderWidgetComponent {}
