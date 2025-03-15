import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import ArticleActionsBarComponent from '../components/article-actions-bar/article-actions-bar.component';
import ArticleListComponent from '../components/article-list/article-list.component';
import { ArticleGateway } from 'src/app/core/ports/article/article.gateway';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-articles-page',
  imports: [ArticleActionsBarComponent, ArticleListComponent],
  template: `
    <div class="h-full">
      <div class="flex flex-col gap-8  p-9">
        <app-article-actions-bar class="w-full" />
        <app-article-list [articles]="articles()" />
      </div>
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
