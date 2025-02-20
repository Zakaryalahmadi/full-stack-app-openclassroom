import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../layout/layout.component'),
    children: [
      { path: 'login', loadComponent: () => import('./login/login.component') },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component'),
      },
    ],
  },
];

export default authRoutes;
