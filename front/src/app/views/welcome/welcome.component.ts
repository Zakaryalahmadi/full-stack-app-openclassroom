import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <img src="/assets/logo_p6.png" alt="logo" />
      <div class="flex flex-col sm:flex-row gap-4">
        <button mat-stroked-button class="w-40">Se connecter</button>
        <button mat-stroked-button class="w-40">S'inscrire</button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [MatButtonModule],
})
export default class WelcomeComponent {}
