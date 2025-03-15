import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
