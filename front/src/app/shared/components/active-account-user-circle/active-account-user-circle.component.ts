import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-active-account-user-circle',
  template: `
    <div
      class="w-14 h-14 border-2 border-primary border-solid rounded-full bg-[#D9D9D9] flex items-center justify-center"
    >
      <img src="/assets/account-user-active.svg" alt="account" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveAccountUserCircleComponent {}
