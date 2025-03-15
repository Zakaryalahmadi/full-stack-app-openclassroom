import { Routes } from '@angular/router';
import { AuthenticationService } from './core/ports/auth/authentication.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/welcome/welcome.component'),
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: '',
        loadChildren: () => import('./views/auth/auth.routing'),
      },
      {
        path: 'home',
        canMatch: [
          () => {
            const authenticationService = inject(AuthenticationService);
            const isAuthenticated = authenticationService.getIsAuthenticated();

            return isAuthenticated();
          },
        ],
        loadChildren: () => import('./views/home/home.routing'),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('../app/views/page-not-found/page-not-found.component'),
  },
];
