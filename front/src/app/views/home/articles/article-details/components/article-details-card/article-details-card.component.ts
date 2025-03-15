import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

import { input } from '@angular/core';
import { Article } from 'src/app/core/models/article.model';
import { GoBackPageHeaderComponent } from 'src/app/shared/components/go-back-page-header/go-back-page-header.component';

@Component({
  selector: 'app-article-details-card',
  template: `
    <app-go-back-page-header>
      <h1>{{ article().title }}</h1>
    </app-go-back-page-header>

    <div class="px-24">
      <div class="flex gap-8">
        <p>{{ article().date | date }}</p>
        <p>{{ article().author }}</p>
        <p>{{ article().theme }}</p>
      </div>
      <div>
        <p>{{ article().content }}</p>
      </div>
    </div>
  `,
  imports: [GoBackPageHeaderComponent, DatePipe],
})
export default class ArticleDetailsCardComponent {
  readonly article = input.required<Article>();
}
