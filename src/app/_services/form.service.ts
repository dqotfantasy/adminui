import {Injectable} from '@angular/core';
import {FormModalComponent} from '../_component/form-modal/form-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {ConfirmComponent} from '../_component/confirm/confirm.component';
import {FilterComponent} from '../_component/filter/filter.component';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private dialog: MatDialog) {

  }

  show(fields: FormlyFieldConfig[], url, method: 'POST' | 'PUT', model: any = {}, options: any = {
    width: 'auto',
    maxWidth: 'auto',
    minWidth: 'auto',
    minHeight: 'auto',
    options: {}
  }) {
    return new Promise((resolve) => {
      const formInstance = this.dialog.open(FormModalComponent, {
        width: options.width,
        maxWidth: options.maxWidth,
        minWidth: options.minWidth,
        minHeight: options.minHeight,
        data: {method, url, fields, model, options},
        panelClass: 'custom-dialog'
      });

      formInstance.afterClosed().subscribe(value => resolve(value));
    });
  }

  confirm(title = 'Confirmation', message = 'Are you sure you want to delete?') {
    return new Promise((resolve) => {
      this.dialog.open(ConfirmComponent, {
        data: {title, message},
        minWidth: '300px',
        disableClose: false
      }).afterClosed().subscribe(value => resolve(value));
    });
  }

  async filter(fields: FormlyFieldConfig[], model: any = {}, options: any = {
    width: 'auto',
    maxWidth: 'auto',
    options: {}
  }) {
    const formInstance = this.dialog.open(FilterComponent, {
      width: options.width,
      maxWidth: options.maxWidth,
      data: {fields, model, options},
      panelClass: 'custom-dialog'
    });

    return formInstance.afterClosed().toPromise();
  }
}
