import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-actions-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="flex items-center justify-between flex-col gap-6 sm:flex-row ">
      <a [routerLink]="['create']" mat-raised-button color="primary">
        Créer un article
      </a>
      <button
        class="text-xl bg-transparent cursor-pointer border-none flex items-center gap-2"
      >
        <span class="m-0 p-0">Trier par</span>
        <mat-icon>arrow_drop_down</mat-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleActionsBarComponent {}
