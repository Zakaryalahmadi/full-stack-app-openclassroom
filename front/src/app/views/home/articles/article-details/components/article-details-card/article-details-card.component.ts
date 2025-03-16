import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { input } from '@angular/core';
import {
  Article,
  ArticleWithTopicTitle,
} from 'src/app/core/models/article.model';
import { GoBackPageHeaderComponent } from 'src/app/shared/components/go-back-page-header/go-back-page-header.component';

@Component({
  selector: 'app-article-details-card',
  template: `
    <app-go-back-page-header>
      <h1>{{ article().title }}</h1>
    </app-go-back-page-header>

    <div class="px-24">
      <div class="flex gap-8">
        <p>{{ article().dateCreated | date }}</p>
        <p>{{ article().author }}</p>
        <p>{{ article().topicTitle }}</p>
      </div>
      <div>
        <p>{{ article().content }}</p>
      </div>
    </div>
  `,
  imports: [GoBackPageHeaderComponent, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleDetailsCardComponent {
  readonly article = input.required<ArticleWithTopicTitle>();
}
