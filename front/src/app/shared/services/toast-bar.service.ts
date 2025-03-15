import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

const TOAST_DURATIONIN_MS = 2;

@Injectable({ providedIn: 'root' })
export class ToastBarService {
  private _snackBar = inject(MatSnackBar);

  private TOAST_DURATIONIN_MS = TOAST_DURATIONIN_MS;

  openErrorSnackBar(message: string): void {
    this._snackBar.open(message, undefined, {
      duration: this.TOAST_DURATIONIN_MS * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
