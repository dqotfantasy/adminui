import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToastComponent} from './toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {
  }

  async success(message, title = 'Success', duration = 2500) {
    await this.snackBar.openFromComponent(ToastComponent, {
      duration,
      data: {title, message, icon: 'check_circle_outline'},
      panelClass: 'toast-panel',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  async error(message, title = 'Error', duration = 2500) {
    await this.snackBar.openFromComponent(ToastComponent, {
      duration,
      data: {title, message, icon: 'highlight_off'},
      panelClass: 'toast-panel',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
