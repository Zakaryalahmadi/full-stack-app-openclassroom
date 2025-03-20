import { Component, input } from '@angular/core';
import { ArticleComment } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-article-comment',
  template: `
    <div class="flex gap-4 mb-4">
      <p>{{ comment().authorName }}</p>
      <div class="bg-card-secondary rounded-xl p-4 w-full h-24">
        {{ comment().content }}
      </div>
    </div>
  `,
})
export class ArticleCommentComponent {
  readonly comment = input.required<ArticleComment>();
}
