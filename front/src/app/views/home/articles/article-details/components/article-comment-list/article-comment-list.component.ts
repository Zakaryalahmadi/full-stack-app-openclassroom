import { Component, inject, input, Signal } from '@angular/core';
import { ArticleCommentComponent } from '../article-comment/article-comment.component';
import { ArticleGateway } from 'src/app/core/ports/article/article.gateway';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticleComment } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-article-comment-list',
  template: `
    <div>
      <h2>Commentaires</h2>
      <div class="ml-16">
        @for (comment of articleComments(); track comment.id) {
        <app-article-comment [comment]="comment" />
        }@empty {
        <p class="text-center text-gray-500">
          Aucun commentaire pour le moment
        </p>
        }
      </div>
    </div>
  `,
  host: {
    class: 'flex-grow basis-0 overflow-y-auto',
  },
  imports: [ArticleCommentComponent],
})
export class ArticleCommentListComponent {
  readonly articleComments = input.required<ArticleComment[]>();
}
