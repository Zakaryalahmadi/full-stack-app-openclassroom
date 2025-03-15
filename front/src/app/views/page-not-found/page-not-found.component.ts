import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink, MatButtonModule],
  template: `
    <h1>404</h1>
    <p>Vous n'êtes pas autorisé à voir cette page</p>
    <a
      mat-raised-button
      color="primary"
      class="text-black no-underline cursor-pointer p-3"
      routerLink="/"
      >Retourner à l'accueil</a
    >
  `,
  styles: [
    `
      :host {
        display: flex;
        height: 100vh;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export default class PageNotFoundComponent {}
