import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <img src="/assets/logo_p6.png" alt="logo" />
      <div class="flex flex-col sm:flex-row gap-40">
        <a routerLink="/login" mat-stroked-button class="w-40">Se connecter</a>
        <a routerLink="/register" mat-stroked-button class="w-40">S'inscrire</a>
      </div>
    </div>
  `,
  standalone: true,
  imports: [MatButtonModule, RouterModule],
})
export default class WelcomeComponent {}
