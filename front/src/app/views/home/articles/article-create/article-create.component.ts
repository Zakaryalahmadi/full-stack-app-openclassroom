import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ArticleCreateFormComponent } from './article-create-form/article-create-form.component';
import { GoBackPageHeaderComponent } from '../../../../shared/components/go-back-page-header/go-back-page-header.component';
import { ArticleGateway } from 'src/app/core/ports/article/article.gateway';
import { CreateArticleDto } from 'src/app/core/models/article.model';
import { exhaustMap, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ToastBarService } from 'src/app/shared/services/toast-bar.service';
@Component({
  selector: 'app-article-create',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ArticleCreateFormComponent,
    GoBackPageHeaderComponent,
  ],
  template: `
    <div class="flex flex-col items-center">
      <app-go-back-page-header class="w-full">
        <h1 class="text-2xl font-bold ">Créer nouvel un article</h1>
      </app-go-back-page-header>
      <app-article-create-form (createArticleTrigger)="createArticle($event)" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleCreateComponent {
  private readonly articleGateway = inject(ArticleGateway);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastBarService = inject(ToastBarService);

  createArticle(createArticleDto: CreateArticleDto): void {
    this.articleGateway
      .createArticle$(createArticleDto)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {
          this.toastBarService.openSuccessSnackBar(
            'Article created successfully'
          );
        })
      )
      .subscribe();
  }
}
