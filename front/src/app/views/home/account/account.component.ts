import { Component, inject } from '@angular/core';
import { AccountUserEditFormComponent } from './account-user-edit-form/account-user-edit-form.component';
import { MatDividerModule } from '@angular/material/divider';
import TopicCardComponent from '../topics/topic-card/topic-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { TopicGateway } from 'src/app/core/ports/topic/topic.gateway';
import {
  TopicActionButtonDirective,
  TopicListComponent,
} from '../topics/topic-list/topic-list.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account',
  template: `
    <div class="flex flex-col gap-4 mt-12">
      <h1 class="text-2xl text-center font-bold">Profil utilisateur</h1>
      <app-account-user-edit-form />
      <div class="mx-24">
        <mat-divider />
      </div>
      <h1 class="text-2xl text-center font-bold">Abonnements</h1>
      <app-topic-list [topics]="userSubscribedTopics()">
        <button
          *topicActionButton
          slot="action-button"
          mat-raised-button
          color="primary"
        >
          Se désabonner
        </button>
      </app-topic-list>
    </div>
  `,
  imports: [
    AccountUserEditFormComponent,
    MatDividerModule,
    TopicListComponent,
    TopicActionButtonDirective,
    MatButtonModule,
  ],
})
export default class AccountComponent {
  readonly topicGateway = inject(TopicGateway);

  readonly userSubscribedTopics = toSignal(this.topicGateway.getTopics$(), {
    initialValue: [],
  });
}
