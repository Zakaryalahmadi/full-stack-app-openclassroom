import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private readonly isDrawerOpen = signal(false);

  toggleDrawer(): void {
    console.log('isDrawerOpen', this.isDrawerOpen());

    this.isDrawerOpen.update((isOpen) => !isOpen);
  }

  getIsDrawerOpen(): Signal<boolean> {
    return this.isDrawerOpen;
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
  }

  openDrawer(): void {
    this.isDrawerOpen.set(true);
  }
}
