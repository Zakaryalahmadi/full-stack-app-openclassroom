import { Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-article-comment-form',
  template: `
    <div class="">
      <form class="flex gap-4">
        <mat-form-field class="w-full ml-40" appearance="outline">
          <mat-label>Ecrivez ici votre commentaire</mat-label>
          <textarea
            rows="5"
            matInput
            [formControl]="commentControl"
            class="w-full"
          ></textarea>
        </mat-form-field>
        <button
          (click)="handleSubmit($event)"
          class="cursor-pointer bg-transparent border-none me-4 "
          type="submit"
        >
          <img src="assets/send-icon.svg" alt="send" />
        </button>
      </form>
    </div>
  `,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class ArticleCommentFormComponent {
  readonly commentTrigger = output<string>();

  readonly commentControl = new FormControl<string>('', {
    nonNullable: true,
  });

  handleSubmit(e: Event) {
    e.preventDefault();
    if (this.commentControl.valid) {
      this.commentTrigger.emit(this.commentControl.value);
    }
  }
}
