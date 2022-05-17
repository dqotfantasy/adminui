import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TdsRoutingModule} from './tds-routing.module';
import {TdsComponent} from './tds.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    TdsComponent
  ],
  imports: [
    CommonModule,
    TdsRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule
  ]
})
export class TdsModule {
}
