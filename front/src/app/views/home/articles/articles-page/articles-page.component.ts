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
import {
  BehaviorSubject,
  combineLatest,
  exhaustMap,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { Topic } from 'src/app/core/models/topic.model';

@Component({
  selector: 'app-articles-page',
  imports: [ArticleActionsBarComponent, ArticleListComponent],
  template: `
    <div class="h-full">
      <div class="flex flex-col gap-8  p-9">
        <app-article-actions-bar
          class="w-full"
          (sortByTrigger)="sortByTrigger$$.next(!sortByTrigger$$.value)"
        />
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

  readonly sortByTrigger$$ = new BehaviorSubject<boolean>(false);

  readonly currentUserId$: Observable<number> = this.userGateway
    .getCurrentUser$()
    .pipe(map((user) => user.id));

  readonly userSubscribedTopics$: Observable<Topic[]> =
    this.currentUserId$.pipe(
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

  readonly articlesRelatedToSubscribedTopics: Signal<Article[]> = toSignal(
    combineLatest([this.userSubscribedTopics$, this.sortByTrigger$$]).pipe(
      switchMap(([topics, ascending]) =>
        this.articleGateway.getArticles$(ascending).pipe(
          map((articles) =>
            articles.filter((article) => {
              console.log('article', article);
              return topics.some(
                (topic) => article.relatedTopicId === topic.id
              );
            })
          )
        )
      )
    ),
    {
      initialValue: [],
    }
  );
}
