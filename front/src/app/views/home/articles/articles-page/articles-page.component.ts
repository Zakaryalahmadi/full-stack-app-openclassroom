import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import ArticleActionsBarComponent from '../components/article-actions-bar/article-actions-bar.component';
import ArticleListComponent from '../components/article-list/article-list.component';
import { ArticleGateway } from 'src/app/core/ports/article/article.gateway';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UserGateway } from 'src/app/core/ports/user/user.gateway';
import { TopicGateway } from 'src/app/core/ports/topic/topic.gateway';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-articles-page',
  imports: [ArticleActionsBarComponent, ArticleListComponent],
  template: `
    <div class="h-full">
      <div class="flex flex-col gap-8  p-9">
        <app-article-actions-bar class="w-full" />
        <app-article-list [articles]="articlesRelatedToSubscribedTopics()" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticlesPageComponent {
  private readonly articleGateway = inject(ArticleGateway);
  private readonly userGateway = inject(UserGateway);
  private readonly topicGateway = inject(TopicGateway);

  readonly currentUserId$ = this.userGateway
    .getCurrentUser$()
    .pipe(map((user) => user.id));

  readonly userSubscribedTopics$ = this.currentUserId$.pipe(
    switchMap((userId) =>
      this.topicGateway
        .getTopics$()
        .pipe(
          map((topics) =>
            topics.filter((topic) => topic.subscriberIds.includes(userId))
          )
        )
    )
  );

  readonly articlesRelatedToSubscribedTopics = toSignal(
    this.userSubscribedTopics$.pipe(
      switchMap((topics) =>
        this.articleGateway
          .getArticles$()
          .pipe(
            map((articles) =>
              articles.filter((article) =>
                topics.some((topic) => article.relatedTopicId === topic.id)
              )
            )
          )
      )
    ),
    {
      initialValue: [],
    }
  );
}
