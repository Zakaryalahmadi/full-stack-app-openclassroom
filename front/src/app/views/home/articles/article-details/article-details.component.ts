import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Signal,
} from '@angular/core';
import {
  Article,
  ArticleComment,
  ArticleWithTopicTitle,
} from 'src/app/core/models/article.model';
import { GoBackPageHeaderComponent } from '../../../../shared/components/go-back-page-header/go-back-page-header.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArticleGateway } from 'src/app/core/ports/article/article.gateway';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import ArticleDetailsCardComponent from './components/article-details-card/article-details-card.component';
import { ArticleCommentListComponent } from './components/article-comment-list/article-comment-list.component';
import { ArticleCommentFormComponent } from './components/article-comment-form/article-comment-form.component';
import { exhaustMap, filter, merge, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-article-details',
  template: `
    @if(article(); as article) {
    <div class="flex flex-col h-full gap-4">
      <app-article-details-card [article]="article" />
      <div class="flex-1 flex flex-col mx-24 gap-8">
        <mat-divider />
        <app-article-comment-list [articleComments]="articleComments()" />
      </div>
      <app-article-comment-form
        (commentTrigger)="commentTrigger$$.next($event)"
      />
    </div>
    }
  `,
  imports: [
    ArticleDetailsCardComponent,
    MatDividerModule,
    ArticleCommentListComponent,
    ArticleCommentFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleDetailsComponent {
  private readonly articleGateway = inject(ArticleGateway);

  private readonly articleId = parseInt(
    inject(ActivatedRoute).snapshot.params['articleId']
  );

  readonly commentTrigger$$ = new Subject<string>();

  private readonly comment$ = this.commentTrigger$$.asObservable().pipe(
    filter(Boolean),
    exhaustMap((content) =>
      this.articleGateway.createComment$({ content }, this.articleId)
    )
  );

  readonly articleComments: Signal<ArticleComment[]> = toSignal(
    merge(
      this.articleGateway.getCommentsByArticleId$(this.articleId),
      this.comment$.pipe(
        switchMap(() =>
          this.articleGateway.getCommentsByArticleId$(this.articleId)
        )
      )
    ),
    {
      initialValue: [],
    }
  );

  readonly article: Signal<ArticleWithTopicTitle | undefined> = toSignal(
    this.articleGateway.getArticleById$(this.articleId)
  );
}
