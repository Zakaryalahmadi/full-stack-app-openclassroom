import { Component } from '@angular/core';

@Component({
  selector: 'app-article-comment',
  template: `
    <div class="flex gap-4 mb-4">
      <p>username</p>
      <div class="bg-card-secondary rounded-xl p-4 w-full h-24">comment</div>
    </div>
  `,
})
export class ArticleCommentComponent {}
