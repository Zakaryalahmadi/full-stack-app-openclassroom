import { Routes } from '@angular/router';

const authRoutes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component') },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component'),
  },
];

export default authRoutes;
