import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { map, Observable, switchMap } from 'rxjs';
import { CreateArticleDto } from 'src/app/core/models/article.model';
import { Topic } from 'src/app/core/models/topic.model';
import { TopicGateway } from 'src/app/core/ports/topic/topic.gateway';
import { UserGateway } from 'src/app/core/ports/user/user.gateway';
export type ArticleFormType = {
  topicId: FormControl<string>;
  title: FormControl<string>;
  content: FormControl<string>;
};

@Component({
  selector: 'app-article-create-form',
  template: `
    <div class="flex justify-center items-center">
      <form class="flex flex-col gap-4 w-1/2">
        <mat-form-field appearance="outline">
          <mat-label>Thème</mat-label>
          <mat-select
            [formControl]="articleForm.controls.topicId"
            placeholder="Sélectionnez un thème"
          >
            @for(topicTitle of userSubscribedTopicsTitles(); track
            topicTitle.id) {
            <mat-option [value]="topicTitle.id">{{
              topicTitle.title
            }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Titre</mat-label>
          <input
            matInput
            [formControl]="articleForm.controls.title"
            placeholder="Titre de l'article"
          />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Contenu</mat-label>
          <textarea
            matInput
            [formControl]="articleForm.controls.content"
            placeholder="Contenu de l'article"
          ></textarea>
        </mat-form-field>
        <div class="flex justify-center">
          <button
            mat-raised-button
            class="w-40"
            (click)="createArticle($event)"
            color="primary"
          >
            Créer
          </button>
        </div>
      </form>
    </div>
  `,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class ArticleCreateFormComponent {
  readonly createArticleTrigger = output<CreateArticleDto>();

  private readonly topicGateway = inject(TopicGateway);

  private readonly userGateway = inject(UserGateway);

  readonly currentUserId$: Observable<number> = this.userGateway
    .getCurrentUser$()
    .pipe(map((user) => user.id));

  readonly articleForm = new FormGroup<ArticleFormType>({
    topicId: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  readonly userSubscribedTopicsTitles = toSignal(
    this.currentUserId$.pipe(
      switchMap((userId) =>
        this.topicGateway.getTopics$().pipe(
          map((topics) => {
            const userSubscribedTopics = topics.filter((topic) =>
              topic.subscriberIds.includes(userId)
            );
            return userSubscribedTopics.map((topic) => ({
              id: topic.id,
              title: topic.title,
            }));
          })
        )
      )
    ),
    { initialValue: [] }
  );

  createArticle(event: Event): void {
    event.preventDefault();
    if (this.articleForm.valid) {
      this.createArticleTrigger.emit(this.articleForm.getRawValue());
    }
  }
}
