import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/welcome/welcome.component'),
  },
  {
    path: '',
    loadChildren: () => import('./views/auth/auth.routing'),
  },
];
