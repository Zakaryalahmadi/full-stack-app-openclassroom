import { Article } from 'src/app/core/models/article.model';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-card',
  imports: [DatePipe, RouterLink],
  template: `
    <a class="no-underline text-black" [routerLink]="[article().id]">
      <div class="bg-card-primary rounded-lg p-4">
        <h2>{{ article().title }}</h2>
        <div class="flex w-1/2 justify-between">
          <p>{{ article().date | date }}</p>
          <p class="center">{{ article().author }}</p>
        </div>
        <p>
          {{ article().content }}
        </p>
      </div>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleCardComponent {
  readonly article = input.required<Article>();
}
