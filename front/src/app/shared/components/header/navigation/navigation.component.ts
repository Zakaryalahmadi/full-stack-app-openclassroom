import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ActiveAccountUserCircleComponent } from '../../active-account-user-circle/active-account-user-circle.component';
import { InactiveAccountUserCircleComponent } from '../../inactive-account-user-circle/inactive-account-user-circle.component';

@Component({
  selector: 'app-navigation',
  imports: [
    MatIconModule,
    RouterModule,
    ActiveAccountUserCircleComponent,
    InactiveAccountUserCircleComponent,
  ],
  template: `
    <div class="h-full flex">
      <nav
        class="w-56 pe-4 flex flex-col items-end justify-between sm:flex-row sm:w-full sm:items-center"
      >
        <ul class="flex flex-col pt-10  sm:flex-row sm:pt-0 gap-10">
          <li class="list-none">
            <a
              routerLink="home/articles"
              [routerLinkActive]="['text-primary']"
              [routerLinkActiveOptions]="{ exact: true }"
              class="no-underline text-2xl sm:text-xl"
              #articleLink="routerLinkActive"
              [class.text-black]="!articleLink.isActive"
              >Articles</a
            >
          </li>
          <li class="list-none">
            <a
              routerLink="home/themes"
              [routerLinkActive]="['text-primary']"
              [routerLinkActiveOptions]="{ exact: true }"
              class="no-underline  text-2xl sm:text-xl"
              #themeLink="routerLinkActive"
              [class.text-black]="!themeLink.isActive"
              >Thèmes</a
            >
          </li>
        </ul>
        <ul>
          <li class="list-none">
            <a
              routerLink="home/account"
              [routerLinkActive]="['text-primary']"
              [routerLinkActiveOptions]="{ exact: true }"
              #accountLink="routerLinkActive"
            >
              <div class="flex items-center gap-2">
                @if (accountLink.isActive) {
                <app-active-account-user-circle />
                } @else {
                <app-inactive-account-user-circle />
                }
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {}
