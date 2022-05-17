import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastComponent} from './toast.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ToastComponent]
})
export class ToastModule {
}
