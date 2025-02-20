import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import ArticleCardComponent from '../article-card/article-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticleGateway } from 'src/app/core/ports/Article.gateway';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-articles-page',
  imports: [ArticleCardComponent, MatButtonModule, MatIconModule],
  template: `
    <div class="flex flex-col items-start p-9 gap-8">
      <div class="w-full flex items-center justify-between">
        <button mat-raised-button color="primary">Créer un article</button>
        <button
          class="text-xl bg-white cursor-pointer border-none flex items-center gap-2"
        >
          <span class="m-0 p-0">Trier par</span>
          <mat-icon>arrow_drop_down</mat-icon>
        </button>
      </div>

      <div class="flex flex-col sm:grid grid-cols-2 gap-5">
        @for (article of articles(); track article.id) {
        <app-article-card [article]="article" />
        }
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
