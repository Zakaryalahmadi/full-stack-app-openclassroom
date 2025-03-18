import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TopicGateway } from 'src/app/core/ports/topic/topic.gateway';
import { toSignal } from '@angular/core/rxjs-interop';
import TopicCardComponent from './topic-card/topic-card.component';
import { MatButtonModule } from '@angular/material/button';
import {
  TopicActionButtonDirective,
  TopicListComponent,
} from './topic-list/topic-list.component';
import { UserGateway } from 'src/app/core/ports/user/user.gateway';
import {
  exhaustMap,
  filter,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { Topic } from 'src/app/core/models/topic.model';
import TopicSubscriptionButtonComponent from './topic-card-subscription-button.component';

@Component({
  selector: 'app-topic-page',
  template: `
    <div class="p-8 flex flex-col sm:grid grid-cols-2 gap-5">
      @for (topic of topics(); track topic.id) { @if(currentUserId() !==
      undefined) {
      <app-topic-card [topic]="topic">
        <app-topic-subscription-button
          slot="action-button"
          [currentUserId]="currentUserId()"
          [topic]="topic"
          (followTrigger)="followTrigger$$.next(topic.id)"
        />
      </app-topic-card>
      } }
    </div>
  `,
  imports: [
    MatButtonModule,
    TopicCardComponent,
    TopicSubscriptionButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TopicPageComponent {
  private readonly topicGateway = inject(TopicGateway);
  private readonly userGateway = inject(UserGateway);

  readonly followTrigger$$ = new Subject<number>();

  readonly followTopic$ = this.followTrigger$$.pipe(
    filter(Boolean),
    exhaustMap((topicId) => this.topicGateway.followTopic$(topicId).pipe())
  );

  readonly currentUserId: Signal<number | undefined> = toSignal(
    this.userGateway
      .getCurrentUser$()
      .pipe(map((currentUser) => currentUser.id))
  );

  readonly topics: Signal<Topic[]> = toSignal(
    this.followTopic$.pipe(
      startWith(undefined),
      switchMap(() => this.topicGateway.getTopics$())
    ),
    {
      initialValue: [],
    }
  );
}
