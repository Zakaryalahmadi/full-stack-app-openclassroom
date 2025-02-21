import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DrawerService } from '../drawer/drawer.service';
import { IfAuthenticatedDirective } from '../../directives/if-authenticated.directive';
import { Router } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { ResponsiveService } from '../../services/responsive.service';
@Component({
  selector: 'app-header',
  imports: [
    NavigationComponent,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    IfAuthenticatedDirective,
  ],
  template: ` @if(!(isLoginOrRegister() && isMobile())){
    <header
      class="flex justify-between p-4 border-solid border-0 border-b border-black-900"
    >
      <img class="w-36" src="/assets/logo_p6.png" alt="logo" />
      <app-navigation *IfAuthenticated class="hidden sm:block" />

      <div *IfAuthenticated class="flex items-center sm:hidden ">
        <button (click)="toggleDrawer()" mat-icon-button>
          <mat-icon>menu</mat-icon>
        </button>
      </div>
    </header>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly drawerService = inject(DrawerService);

  readonly isMobile = inject(ResponsiveService).getIsMobile();

  readonly isLoginOrRegister: Signal<boolean | undefined> =
    inject(RouteService).isLoginOrRegister();

  toggleDrawer(): void {
    this.drawerService.toggleDrawer();
  }
}
