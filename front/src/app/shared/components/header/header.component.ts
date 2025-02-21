import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DrawerService } from '../drawer/drawer.service';

@Component({
  selector: 'app-header',
  imports: [
    NavigationComponent,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
  ],
  template: ` <header
    class="flex justify-between p-4 border-solid border-0 border-b border-black-900"
  >
    <img class="w-36" src="/assets/logo_p6.png" alt="logo" />
    <app-navigation class="hidden sm:block" />

    <div class="flex items-center sm:hidden ">
      <button (click)="toggleDrawer()" mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>
    </div>
  </header>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly drawerService = inject(DrawerService);

  toggleDrawer(): void {
    this.drawerService.toggleDrawer();
  }
}
