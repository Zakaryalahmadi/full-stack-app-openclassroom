import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthenticationService } from 'src/app/core/ports/auth/authentication.service';

const homeRouting: Routes = [
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full',
  },
  {
    path: 'articles',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./articles/articles-page/articles-page.component'),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./articles/article-create/article-create.component'),
      },
      {
        path: ':articleId',
        loadComponent: () =>
          import('./articles/article-details/article-details.component'),
      },
    ],
  },
  {
    path: 'themes',
    loadComponent: () => import('./topics/topic-page.component'),
  },
  {
    path: 'account',
    loadComponent: () => import('./account/account.component'),
  },
];

export default homeRouting;
