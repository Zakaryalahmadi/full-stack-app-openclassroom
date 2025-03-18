import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Article } from 'src/app/core/models/article.model';
import ArticleCardComponent from '../article-card/article-card.component';

@Component({
  selector: 'app-article-list',
  template: `
    <div class="flex flex-col sm:grid grid-cols-2 gap-5">
      @for (article of articles(); track article.id) {
      <app-article-card [article]="article" />
      }
    </div>
    @if (articles().length === 0) {
    <div class="flex justify-center items-center h-full">
      <p class="text-gray-500">No articles found</p>
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArticleCardComponent],
})
export default class ArticleListComponent {
  readonly articles = input.required<Article[]>();
}
