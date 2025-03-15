import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { GoBackDirective } from '../../directives/go-back.directive';

@Component({
  selector: 'app-go-back-page-header',
  template: `
    <div class="relative flex items-center p-4">
      <mat-icon goBack class="absolute mb-4 cursor-pointer"
        >arrow_back</mat-icon
      >
      <div class="w-full flex justify-center">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  imports: [MatIconModule, GoBackDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoBackPageHeaderComponent {}
