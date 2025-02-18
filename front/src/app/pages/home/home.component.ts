import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <img src="/assets/logo_p6.png" alt="logo" />
      <h1 class="text-3xl font-bold underline">Welcome to MDD</h1>
      <button mat-raised-button color="primary" (click)="start()">
        Commencer
      </button>
    </div>
  `,
  standalone: true,
  imports: [MatButtonModule],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  start() {
    alert('Commencez par lire le README et à vous de jouer !');
  }
}
