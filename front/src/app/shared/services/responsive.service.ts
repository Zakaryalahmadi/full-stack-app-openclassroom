import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CustomBreakPoints } from '../types/custom-break-points';
@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  private readonly CustomBreakPoints = CustomBreakPoints;

  private readonly isMobile = toSignal(
    this.breakpointObserver
      .observe(this.CustomBreakPoints.Mobile)
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  getIsMobile(): Signal<boolean> {
    return this.isMobile;
  }
}
