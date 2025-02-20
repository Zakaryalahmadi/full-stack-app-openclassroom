import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-layout',
  template: `
    <div class="flex flex-col h-screen">
      <app-header class="hidden sm:block"></app-header>
      <div class="flex-1">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
})
export default class LayoutComponent {}
