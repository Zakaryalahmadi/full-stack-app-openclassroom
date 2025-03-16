import {
  Component,
  computed,
  inject,
  DestroyRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AccountUserEditFormComponent } from './account-user-edit-form/account-user-edit-form.component';
import { MatDividerModule } from '@angular/material/divider';
import TopicCardComponent from '../topics/topic-card/topic-card.component';
import {
  toSignal,
  toObservable,
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';
import { TopicGateway } from 'src/app/core/ports/topic/topic.gateway';
import {
  TopicActionButtonDirective,
  TopicListComponent,
} from '../topics/topic-list/topic-list.component';
import { MatButtonModule } from '@angular/material/button';
import { UserGateway } from 'src/app/core/ports/user/user.gateway';
import {
  combineLatest,
  delay,
  exhaustMap,
  filter,
  map,
  merge,
  startWith,
  Subject,
  switchMap,
  shareReplay,
  of,
  catchError,
  tap,
} from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UpdateUserDto } from 'src/app/core/models/user.model';
import { ToastBarService } from 'src/app/shared/services/toast-bar.service';
@Component({
  selector: 'app-account',
  template: `
    <div class="flex flex-col gap-4 mt-12">
      <h1 class="text-2xl text-center font-bold">Profil utilisateur</h1>
      @if(currentUser()) {
      <app-account-user-edit-form
        [currentUser]="currentUser()"
        (updateUserTrigger)="updateUserTrigger$$.next($event)"
      />
      }
      <div class="mx-24">
        <mat-divider />
      </div>
      <h1 class="text-2xl text-center font-bold">Abonnements</h1>

      <div class="p-8 flex flex-col sm:grid grid-cols-2 gap-5">
        @for(topic of userSubscribedTopics(); track topic.id) {
        <app-topic-card [topic]="topic">
          <button
            slot="action-button"
            mat-raised-button
            color="primary"
            (click)="unfollowTrigger$$.next(topic.id)"
          >
            Se désabonner
          </button>
        </app-topic-card>
        }
      </div>
      @if(userSubscribedTopics().length === 0) {
      <h4 class="text-center">Vous n'êtes abonné à aucun théme</h4>
      }
    </div>
  `,
  imports: [
    AccountUserEditFormComponent,
    MatDividerModule,
    MatButtonModule,
    TopicCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccountComponent {
  private readonly topicGateway = inject(TopicGateway);

  private readonly userGateway = inject(UserGateway);

  private readonly toastBarService = inject(ToastBarService);

  readonly unfollowTrigger$$ = new Subject<string>();

  readonly updateUserTrigger$$ = new Subject<UpdateUserDto>();

  private readonly unFollowTopic$ = this.unfollowTrigger$$.asObservable().pipe(
    filter(Boolean),
    exhaustMap((topicId) => this.topicGateway.unfollowTopic$(topicId))
  );

  private readonly updateUser$ = this.updateUserTrigger$$.asObservable().pipe(
    filter(Boolean),
    exhaustMap((updateUserDto) =>
      this.userGateway.updateUser$(updateUserDto).pipe(
        tap(() =>
          this.toastBarService.openSuccessSnackBar('update user success')
        ),
        catchError(() => {
          this.toastBarService.openErrorSnackBar('update user error');
          return of(null);
        })
      )
    ),
    filter(Boolean)
  );
  readonly currentUser = toSignal(
    merge(
      this.userGateway.getCurrentUser$(),
      this.updateUser$.pipe(switchMap(() => this.userGateway.getCurrentUser$()))
    )
  );

  readonly currentUserId = computed(() => this.currentUser()?.id);

  readonly userSubscribedTopics = toSignal(
    combineLatest([
      toObservable(this.currentUserId),
      this.unFollowTopic$.pipe(startWith(undefined)),
    ]).pipe(
      switchMap(([userId]) =>
        this.topicGateway.getTopics$().pipe(
          map((topics) => {
            if (!userId) return [];
            return topics.filter((topic) =>
              topic.subscriberIds.includes(userId)
            );
          })
        )
      )
    ),
    { initialValue: [] }
  );
}
