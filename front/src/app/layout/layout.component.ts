import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DrawerComponent } from '../shared/components/drawer/drawer.component';
import { DrawerService } from '../shared/components/drawer/drawer.service';
@Component({
  selector: 'app-layout',
  template: `
    <app-drawer>
      <div app-drawer-content class="flex flex-col h-screen">
        <app-header></app-header>
        <div class="flex-1">
          <router-outlet></router-outlet>
        </div>
      </div>
    </app-drawer>
  `,
  imports: [
    MatSidenavModule,
    MatIconModule,
    HeaderComponent,
    RouterOutlet,
    DrawerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
