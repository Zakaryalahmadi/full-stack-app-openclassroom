import { Routes } from '@angular/router';

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
        loadChildren: () => import('./views/home/home.routing'),
      },
    ],
  },
];
