import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import ArticleCardComponent from '../article-card/article-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticleGateway } from 'src/app/core/ports/Article.gateway';

@Component({
  selector: 'app-articles-page',
  imports: [ArticleCardComponent],
  template: `
    <div class="flex flex-col">
      @for (article of articles(); track article.id) {
      <app-article-card [article]="article" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticlesPageComponent {
  readonly articleGateway = inject(ArticleGateway);

  readonly articles = toSignal(this.articleGateway.getArticles$(), {
    initialValue: [],
  });
}
