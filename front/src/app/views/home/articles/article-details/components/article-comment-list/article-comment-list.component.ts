import { Component } from '@angular/core';
import { ArticleCommentComponent } from '../article-comment/article-comment.component';

@Component({
  selector: 'app-article-comment-list',
  template: `
    <div>
      <h2>Commentaires</h2>
      <div class="ml-16">
        <app-article-comment />
        <app-article-comment />
        <app-article-comment />
        <app-article-comment />
        <app-article-comment />
        <app-article-comment />
      </div>
    </div>
  `,
  host: {
    class: 'flex-grow basis-0 overflow-y-auto',
  },
  imports: [ArticleCommentComponent],
})
export class ArticleCommentListComponent {}
