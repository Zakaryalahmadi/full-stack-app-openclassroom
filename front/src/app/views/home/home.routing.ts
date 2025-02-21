import { Routes } from '@angular/router';

const homeRouting: Routes = [
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full',
  },
  {
    path: 'articles',
    loadComponent: () =>
      import('./articles/articles-page/articles-page.component'),
  },
  {
    path: 'themes',
    loadComponent: () => import('./topics/topic-card/topic-card.component'),
  },
];

export default homeRouting;
