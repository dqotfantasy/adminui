import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateContestsRoutingModule } from './private-contests-routing.module';
import { PrivateContestsComponent } from './private-contests.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [PrivateContestsComponent],
  exports: [
    PrivateContestsComponent
  ],
  imports: [
    CommonModule,
    PrivateContestsRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule
  ]
})
export class PrivateContestsModule {
}
