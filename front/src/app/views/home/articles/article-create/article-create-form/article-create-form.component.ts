import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export type ArticleFormType = {
  theme: FormControl<string>;
  title: FormControl<string>;
  content: FormControl<string>;
};

@Component({
  selector: 'app-article-create-form',
  template: `
    <div class="flex justify-center items-center">
      <form class="flex flex-col gap-4 w-96">
        <mat-form-field appearance="outline">
          <mat-label>Thème</mat-label>
          <mat-select
            [formControl]="articleForm.controls.theme"
            placeholder="Sélectionnez un thème"
          >
            <mat-option value="1">Thème 1</mat-option>
            <mat-option value="2">Thème 2</mat-option>
            <mat-option value="3">Thème 3</mat-option>
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
          <button mat-raised-button class="w-40" color="primary">Créer</button>
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
})
export class ArticleCreateFormComponent {
  readonly articleForm = new FormGroup<ArticleFormType>({
    theme: new FormControl<string>('', { nonNullable: true }),
    title: new FormControl<string>('', { nonNullable: true }),
    content: new FormControl<string>('', { nonNullable: true }),
  });
}
