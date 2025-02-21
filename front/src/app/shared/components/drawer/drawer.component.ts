import { Component, inject } from '@angular/core';
import { DrawerService } from './drawer.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { NavigationComponent } from '../header/navigation/navigation.component';
import { ResponsiveService } from '../../services/responsive.service';
@Component({
  selector: 'app-drawer',
  template: `
    <mat-drawer-container>
      <mat-drawer
        (closedStart)="closeDrawer()"
        mode="over"
        position="end"
        [opened]="isDrawerOpen() && isMobile()"
      >
        <app-navigation />
      </mat-drawer>
      <mat-drawer-content>
        <ng-content select="[app-drawer-content]" />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  imports: [MatSidenavModule, MatIconModule, NavigationComponent],
})
export class DrawerComponent {
  private readonly drawerService = inject(DrawerService);

  readonly isDrawerOpen = this.drawerService.getIsDrawerOpen();

  readonly isMobile = inject(ResponsiveService).getIsMobile();

  closeDrawer(): void {
    this.drawerService.closeDrawer();
  }
}
