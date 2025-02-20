import { Routes } from '@angular/router';

const homeRouting: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./articles/articles-page/articles-page.component'),
  },
];

export default homeRouting;
